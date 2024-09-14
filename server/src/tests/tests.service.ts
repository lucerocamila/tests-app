import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities';

@Injectable()
export class TestsService {
  private readonly logger = new Logger('TestService');

  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTestDto: CreateTestDto) {
    const test = this.testRepository.create({
      ...createTestDto,
    });

    try {
      await this.testRepository.save(test);
      return test;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const tests = await this.testRepository.createQueryBuilder('test')
    .where('test.isActive = :isActive', { isActive: true })
    .leftJoinAndSelect('test.question', 'question', 'question.isActive = :isActive', { isActive: true })
    .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
    .getMany();

    if (!tests) throw new NotFoundException(`Tests not found`);

    try {
      return tests;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const test = await this.testRepository.createQueryBuilder('test')
    .where('test.id = :id', { id })
    .leftJoinAndSelect('test.question', 'question', 'question.isActive = :isActive', { isActive: true })
    .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
    .getOne();

    if (!test) throw new NotFoundException(`Test with id: ${id} not found`);
    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    const test = await this.testRepository.preload({
      id: id,
      ...updateTestDto,
    });
    if (!test) throw new NotFoundException(`Test with ${id} not found`);
    try {
      await this.testRepository.save(test);
      return test;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
      const test = await this.findOne(id);
      test.isActive = false;
      await this.testRepository.save(test);
  
      return {
        message: `Test with id: ${id} deleted successfully`,
      };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error!, check server logs',
    );
  }
}
