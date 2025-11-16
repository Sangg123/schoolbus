import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';
import { PageableStudentResponseDto } from './dto/pageable-student-response.dto';
import { PaginatedQueryStudentDto } from './dto/paginated-query-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    const student = await this.studentRepository.create({
      fullName: createStudentDto.fullName,
      class: createStudentDto.class,
      studentCode: createStudentDto.studentCode,
    });
    return StudentResponseDto.fromStudent(student);
  }

  async findAll(query: QueryStudentDto): Promise<StudentResponseDto[]> {
    const filter = this.buildFilter(query);
    const students = await this.studentRepository.findByFilter(filter);
    return students.map(StudentResponseDto.fromStudent);
  }

  async findAllWithPagination(
    query: PaginatedQueryStudentDto,
  ): Promise<PageableStudentResponseDto> {
    const { page, limit, sortBy, sortOrder, ...filterData } = query;
    const filter = this.buildFilter(filterData);
    const pagination = { page, limit, sortBy, sortOrder };

    const result = await this.studentRepository.findByFilterWithPagination(
      filter,
      pagination,
    );

    return {
      ...result,
      data: result.data.map(StudentResponseDto.fromStudent),
    };
  }

  async findOne(id: number): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return StudentResponseDto.fromStudent(student);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    const updatedStudent = await this.studentRepository.update(id, {
      fullName: updateStudentDto.fullName,
      class: updateStudentDto.class,
      studentCode: updateStudentDto.studentCode,
    });
    return StudentResponseDto.fromStudent(updatedStudent);
  }

  async remove(id: number): Promise<void> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    await this.studentRepository.delete(id);
  }

  private buildFilter(query: QueryStudentDto): Prisma.StudentWhereInput {
    const filter: Prisma.StudentWhereInput = {};

    if (query.fullName) {
      filter.fullName = { contains: query.fullName, mode: 'insensitive' };
    }

    if (query.class) {
      filter.class = { contains: query.class, mode: 'insensitive' };
    }

    if (query.studentCode) {
      filter.studentCode = { contains: query.studentCode, mode: 'insensitive' };
    }

    return filter;
  }
}
