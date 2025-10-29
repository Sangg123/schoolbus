import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pageable } from 'src/core/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedQueryUserDto } from './dto/paginated-query-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersRepository } from './users.repository';
import { PageableUserResponseDto } from './dto/pageable-user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { password, ...userData } = createUserDto;

    // Check if email already exists
    const existingUser = await this.usersRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.usersRepository.create({
      ...userData,
      passwordHash,
    });

    return UserResponseDto.fromUser(user);
  }

  async findAll(query: QueryUserDto): Promise<UserResponseDto[]> {
    const filter = this.buildFilter(query);
    const users = await this.usersRepository.findByFilter(filter);
    return users.map(UserResponseDto.fromUser);
  }

  async findAllWithPagination(
    query: PaginatedQueryUserDto,
  ): Promise<PageableUserResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.usersRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(UserResponseDto.fromUser),
    };
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserResponseDto.fromUser(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...updateData } = updateUserDto;
    const updateInput: Prisma.UserUpdateInput = { ...updateData };

    if (password) {
      updateInput.passwordHash = await bcrypt.hash(password, 12);
    }

    const updatedUser = await this.usersRepository.update(id, updateInput);
    return UserResponseDto.fromUser(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    return this.usersRepository.findByEmailOrPhone(emailOrPhone);
  }

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersRepository.findByEmailOrPhone(identifier);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  private buildFilter(query: QueryUserDto): Prisma.UserWhereInput {
    const filter: Prisma.UserWhereInput = {};

    if (query.email) {
      filter.email = { contains: query.email, mode: 'insensitive' };
    }

    if (query.fullName) {
      filter.fullName = { contains: query.fullName, mode: 'insensitive' };
    }

    if (query.phone) {
      filter.phone = { contains: query.phone };
    }

    if (query.role) {
      filter.role = query.role;
    }

    return filter;
  }
}
