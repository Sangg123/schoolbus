import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User, Prisma } from '../../../generated/prisma';

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

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map(UserResponseDto.fromUser);
  }

  async findAllWithPagination(query: QueryUserDto) {
    const { page, limit, sortBy, sortOrder, ...filter } = query;
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.usersRepository.findByFilterWithPagination(
      this.buildFilter(filter),
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
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

  private buildFilter(query: Omit<QueryUserDto, 'page' | 'limit' | 'sortBy' | 'sortOrder'>): Prisma.UserWhereInput {
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
