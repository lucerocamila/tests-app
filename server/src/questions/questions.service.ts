import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Test } from 'src/tests/entities/test.entity';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger('QuestionService');

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
  ) { }
  async create(createQuestionDto: CreateQuestionDto) {

    const { description, testId, typeQuestion } = createQuestionDto
    if (!testId) throw new BadRequestException('Missing testId to relate to the question');
    if (!description) throw new BadRequestException('Missing question description');

    const test = await this.testRepository.findOneBy({ id: testId });
    if (!test) throw new NotFoundException(`Test with id ${testId} not found`);

    let payload: { description: string; test: Test; typeQuestion?: string; };
    if (typeQuestion) {
      payload = {
        description,
        test,
        typeQuestion,
      }
    } else {
      payload = {
        description,
        test
      }

    }
    const question = this.questionRepository.create(payload);
    try {
      await this.questionRepository.save(question);
      return question;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const questions = await this.questionRepository.createQueryBuilder('question')
        .where('question.isActive = :isActive', { isActive: true })
        .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
        .getMany();

        if (!questions) throw new NotFoundException(`Questions not found`);

      return questions;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {

      const question = await this.questionRepository.createQueryBuilder('question')
        .where('question.isActive = :isActive', { isActive: true })
        .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
        .getOne();

        if (!question) throw new NotFoundException(`Questions not found`);
        
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.preload({
      id: id,
      ...updateQuestionDto,
    });
    if (!question) throw new NotFoundException(`Question with ${id} not found`);
    try {
      await this.questionRepository.save(question);
      return {
        message: `Question with id: ${id} updated`,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const question = await this.findOne(id);
    if (!question) throw new NotFoundException(`Question with ${id}
     id not found`);
    question.isActive = false;
    await this.questionRepository.save(question);
    return {
      message: `Question with ${id} deleted`,
    }
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
