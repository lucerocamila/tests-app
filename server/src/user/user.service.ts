import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../auth/dto';
import { Role, User } from 'src/auth/entities';
import { isEmail, isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validRoles } from 'src/auth/interfaces';
import { Test } from 'src/tests/entities/test.entity';
import * as bcrypt from 'bcrypt';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async getSearchConditionUsers(
    limit: number,
    offset: number,
    userLoggedIn: User,
  ) {
    const whereConditions: Record<string, any> = {
      isActive: true,
    };

    if (userLoggedIn.role.title === validRoles.consultant) {
      whereConditions.createdBy = userLoggedIn.id;
    }

    const users = await this.userRepository
      .createQueryBuilder('user')
      .where(whereConditions)
      .leftJoinAndSelect('user.company', 'company', 'company.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('user.test', 'test', 'test.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('test.question', 'question', 'question.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
      .take(limit)
      .skip(offset)
      .getMany();
    return users;
  }

  async findAll(
    paginationDto: PaginationDto,
    userLoggedIn: User,
  ): Promise<User[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.getSearchConditionUsers(
      limit,
      offset,
      userLoggedIn,
    );

    if (!users.length) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }

  getSearchConditionUser(
    term: string,
    userLoggedIn: User,
  ): Record<string, any> {
    const searchCondition: Record<string, any> = {
      isActive: true,
    };

    if (isUUID(term)) {
      searchCondition.id = term;
    } else if (isEmail(term)) {
      searchCondition.email = term;
    } else if (isNaN(+term)) {
      searchCondition.fullName = term;
    } else {
      `User with search term: "${term}" not found or is not active`;
    }

    if (userLoggedIn.role.title === validRoles.consultant) {
      searchCondition.createdBy = userLoggedIn.id;
    }

    return searchCondition;
  }

  async findOne(term: string, userLoggedIn: User): Promise<User> {
    const searchCondition = this.getSearchConditionUser(term, userLoggedIn);

    const user = await this.userRepository.createQueryBuilder('user')
      .where(searchCondition)
      .leftJoinAndSelect('user.company', 'company', 'company.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('user.test', 'test', 'test.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('test.question', 'question', 'question.isActive = :isActive', { isActive: true })
      .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
      .getOne();

    if (!user) {
      throw new NotFoundException(
        `User with search term: "${term}" not found or is not active`,
      );
    }

    return user;
  }

  async findOneWithRoles(term: string): Promise<User> {
    let user: User;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role');

    if (isUUID(term)) {
      user = await queryBuilder
        .where('user.id = :id', { id: term })
        .andWhere('user.isActive = true')
        .getOne();
    } else if (isNaN(+term)) {
      if (isEmail(term)) {
        user = await queryBuilder
          .where('user.email = :email', { email: term })
          .andWhere('user.isActive = true')
          .getOne();
      } else {
        user = await queryBuilder
          .where('user.fullName = :fullName', { fullName: term })
          .andWhere('user.isActive = true')
          .getOne();
      }
    }

    if (!user) {
      throw new NotFoundException(
        `User with search term: "${term}" not found or is not active `,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, userLoggedIn: User) {
    await this.findOne(id, userLoggedIn);
    const { roleTitle, testId, password, email, companyId, ...rest } = updateUserDto;
    const user = await this.userRepository.preload({
      id,
      ...rest,
    });

    if (password) {
      user.password = bcrypt.hashSync(password, 10)
    }

    if (email) {
      throw new BadRequestException(`User email can't be changed`)
    }


    if (companyId) {
      const company = await this.companyRepository.findOneBy({
        id: companyId,
      });
      if (!company) {
        throw new BadRequestException(
          `Company ${companyId} not found, please check all companies in the database and enter a valid company id. If company isn't exist yet, register it first. If the user is not related to a company yo dont need to send a country id`,
        );
      }
      user.company = company;
    }

    if (roleTitle) {
      if (userLoggedIn.role.title === validRoles.admin) {
        const role = await this.roleRepository.findOneBy({ title: roleTitle });
        user.role = role;
      } else {
        throw new BadRequestException(
          `User with role: ${userLoggedIn.role.title} can't assign a role`,
        );
      }
    }

    if (testId) {
      const matchTest = await this.testRepository.findOneBy({
        id: testId,
      });

      if (matchTest.isActive === false) {
        throw new BadRequestException(
          `Test with id: ${testId} is not active`,
        );
      }
      const userToUpdateTest = await this.userRepository.findOne({
        where: { id: id },
        relations: ['test'], // Load the test relation for the user
      });

      const tests = userToUpdateTest.test; // Fetch courses fro user
      user.test = tests;
      user.test.push(matchTest);
    }

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string, userLoggedIn: User) {
    const user = await this.findOne(id, userLoggedIn);
    user.isActive = false;
    await this.userRepository.save(user);
    return {
      message: `User with id: ${id} deleted successfully`,
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
