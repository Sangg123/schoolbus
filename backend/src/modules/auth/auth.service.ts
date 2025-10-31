import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(identifier: string, password: string) {
    const user = await this.usersService.validateUser(identifier, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.identifier,
      loginDto.password,
    );

    return this.loginWithUser(user);
  }

  loginWithUser(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const expiresIn = process.env.JWT_EXPIRATION || '1d';
    // @ts-ignore
    const expiresMs = ms(expiresIn) ?? ms('1d');
    const expiresAt = new Date(Date.now() + expiresMs).toISOString();

    return {
      accessToken: this.jwtService.sign(payload),
      user: UserResponseDto.fromUser(user),
      expiresAt,
    };
  }

  async register(registerDto: RegisterDto) {
    // In a real app, you might want different registration logic
    return this.usersService.create(registerDto);
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const isValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.passwordHash,
    );
    if (!isValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.usersService.update(userId, {
      password: changePasswordDto.newPassword,
    });

    return { message: 'Password changed successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    // Find user by email or phone
    const user = await this.usersService.findByEmailOrPhone(
      forgotPasswordDto.emailOrPhone,
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Create reset token (JWT that expires in 1 hour)
    const payload = {
      email: user.email,
      sub: user.id,
      type: 'password_reset',
    };

    const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    this.logger.log(
      `Password reset token generated for user ${user.id}: ${resetToken}`,
    );

    // In a real app, you would send this token via email
    // For now, we'll return it (for demo purposes only!)
    return {
      resetToken,
      message:
        'Password reset token generated. Use this token to reset your password.',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const payload = this.jwtService.verify(resetPasswordDto.resetToken);

      if (payload.type !== 'password_reset') {
        throw new BadRequestException('Invalid reset token');
      }

      await this.usersService.update(payload.sub, {
        password: resetPasswordDto.newPassword,
      });

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }

  async logout() {
    // Since we're using stateless JWT, logout is handled on the client side
    // by removing the token. In a real app with token blacklisting,
    // you would add the token to a blacklist here.
    return { message: 'Logged out successfully' };
  }

  async getProfile(userId: number) {
    return this.usersService.findOne(userId);
  }
}
