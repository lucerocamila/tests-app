/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';

@Injectable()
export class AnswersService {
  private readonly logger = new Logger('AnswerService');

  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async create(createAnswerDto: CreateAnswerDto) {
    const {questionId, ...rest} = createAnswerDto;
    if (!questionId) throw new BadRequestException('Missing questionId to relate to the answer');
    const question = await this.questionRepository.findOneBy({id: questionId});
    if (!question) throw new NotFoundException(`Question with id ${questionId} not found`);

    const answer = this.answerRepository.create({
      ...rest,
      question: {id: questionId}
    })
    try {
      await this.answerRepository.save(answer);
      return answer;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const answers = await this.answerRepository.createQueryBuilder('answer')
      .where('answer.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('answer.question', 'question', 'question.isActive = :isActive', { isActive: true })
      .getMany();
      
      if (!answers) throw new NotFoundException(`Answers not found`);

      return answers;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    const answer = await this.answerRepository.createQueryBuilder('answer')
    .leftJoinAndSelect('answer.question', 'question')
    .where('answer.id = :id', { id })
    .getOne();
    return answer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const {isActive} = updateAnswerDto;
    if (isActive) await this.answerRepository.update(id, {isActive})
    const answer = await this.findOne(id)
    if (!answer) throw new NotFoundException(`Answer with ${id} not found`);
    try {
      await this.answerRepository.update(id, updateAnswerDto);
      return {
        message: `Answer with id: ${id} updated successfully`,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const answer = await this.findOne(id);
    answer.isActive = false;
    await this.answerRepository.save(answer);

    return {
      message: `Answer with id: ${id} deleted successfully`,
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
