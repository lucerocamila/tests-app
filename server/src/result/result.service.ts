import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';
import { Test } from 'src/tests/entities/test.entity';

@Injectable()
export class ResultService {
  private readonly logger = new Logger('ResultService');

  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(createResultDto: CreateResultDto) {
    const { userId, testId, description, result_detail } = createResultDto;
    
    const test = await this.testRepository.findOne({
      where: {
        id: testId,
      }
    });
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    });
    if (!test) {
      throw new NotFoundException(`Test not found`);
    }
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    let result: Result;
    const resultJson: any = result_detail;
    result = this.resultRepository.create({
      description,
      result_detail: resultJson,
      test,
      user
    });

    try {
      await this.resultRepository.save(result);
      return result;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const results = await this.resultRepository.createQueryBuilder('result')
        .leftJoinAndSelect('result.test', 'test')
        .leftJoinAndSelect('result.user', 'user')
        .getMany();
        
      if (!results) {
        throw new NotFoundException(`Not results found`);
      }
      return results;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const result = await this.resultRepository.createQueryBuilder('result')
    .where('result.id = :id', { id })
    .leftJoinAndSelect('result.test', 'test')
    .leftJoinAndSelect('result.user', 'user')
    .getOne();

    if (!result) throw new NotFoundException(`Result with ${id} not found`);
    return result;
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
