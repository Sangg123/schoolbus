import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ParentStudentRepository } from './parent-student.repository';
import { CreateParentStudentDto } from './dto/create-parent-student.dto';
import { UpdateParentStudentDto } from './dto/update-parent-student.dto';
import { ParentStudentResponseDto } from './dto/parent-student-response.dto';
import { QueryParentStudentDto } from './dto/query-parent-student.dto';
import { PaginatedQueryParentStudentDto } from './dto/paginated-query-parent-student.dto';
import { Prisma } from '@prisma/client';
import { PageableParentStudentResponseDto } from './dto/pageable-parent-student-response.dto';

@Injectable()
export class ParentStudentService {
  constructor(private readonly parentStudentRepository: ParentStudentRepository) {}

  async create(createParentStudentDto: CreateParentStudentDto): Promise<ParentStudentResponseDto> {
    const parentStudent = await this.parentStudentRepository.create({
      parent: {
        connect: {
          id: createParentStudentDto.parentId,
        },
      },
      student: {
        connect: {
          id: createParentStudentDto.studentId,
        },
      },
      relationship: createParentStudentDto.relationship,
    });
    return ParentStudentResponseDto.fromParentStudent(parentStudent);
  }

  async findAll(query: QueryParentStudentDto): Promise<ParentStudentResponseDto[]> {
    const filter = this.buildFilter(query);
    const parentStudents = await this.parentStudentRepository.findByFilter(filter);
    return parentStudents.map(ParentStudentResponseDto.fromParentStudent);
  }

  async findAllWithPagination(
    query: PaginatedQueryParentStudentDto,
  ): Promise<PageableParentStudentResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.parentStudentRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(ParentStudentResponseDto.fromParentStudent),
    };
  }

  async findOne(id: number): Promise<ParentStudentResponseDto> {
    const parentStudent = await this.parentStudentRepository.findById(id);
    if (!parentStudent) {
      throw new NotFoundException(`ParentStudent with ID ${id} not found`);
    }
    return ParentStudentResponseDto.fromParentStudent(parentStudent);
  }

  async update(
    id: number,
    updateParentStudentDto: UpdateParentStudentDto,
  ): Promise<ParentStudentResponseDto> {
    const parentStudent = await this.parentStudentRepository.findById(id);
    if (!parentStudent) {
      throw new NotFoundException(`ParentStudent with ID ${id} not found`);
    }

    const updatedParentStudent = await this.parentStudentRepository.update(id, {
      parent: updateParentStudentDto.parentId ? {
        connect: {
          id: updateParentStudentDto.parentId,
        },
      } : undefined,
      student: updateParentStudentDto.studentId ? {
        connect: {
          id: updateParentStudentDto.studentId,
        },
      } : undefined,
      relationship: updateParentStudentDto.relationship,
    });
    return ParentStudentResponseDto.fromParentStudent(updatedParentStudent);
  }

  async remove(id: number): Promise<void> {
    const parentStudent = await this.parentStudentRepository.findById(id);
    if (!parentStudent) {
      throw new NotFoundException(`ParentStudent with ID ${id} not found`);
    }
    await this.parentStudentRepository.delete(id);
  }

  private buildFilter(query: QueryParentStudentDto): Prisma.ParentStudentWhereInput {
    const filter: Prisma.ParentStudentWhereInput = {};

    if (query.parentId) {
      filter.parentId = query.parentId;
    }

    if (query.studentId) {
      filter.studentId = query.studentId;
    }

    if (query.relationship) {
      filter.relationship = { contains: query.relationship, mode: 'insensitive' };
    }

    if (query.parentName) {
      filter.parent = {
        user: {
          fullName: { contains: query.parentName, mode: 'insensitive' },
        },
      };
    }

    if (query.studentName) {
      filter.student = {
        fullName: { contains: query.studentName, mode: 'insensitive' },
      };
    }

    return filter;
  }
}
