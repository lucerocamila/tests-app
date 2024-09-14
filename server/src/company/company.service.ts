import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail, isUUID } from 'class-validator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { User } from 'src/auth/entities';
import { validRoles } from 'src/auth/interfaces';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, userLoggedIn: User) {
    let payload: Company | DeepPartial<Company>[];
    if (userLoggedIn.role.title !== validRoles.user) {
      payload = this.companyRepository.create({
        ...createCompanyDto,
        createdBy: userLoggedIn.id,
      });
    } else {
      throw new BadRequestException(
        `User with role: "${userLoggedIn.role.title}" can't create companies`,
      );
    }
    try {
      const company = this.companyRepository.create(payload);
      return await this.companyRepository.save(company);
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async getSearchConditionCompanies(
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
    const companies = await this.companyRepository
      .createQueryBuilder('company')
      .where(whereConditions)
      .leftJoinAndSelect('company.employees', 'employees')
      .leftJoinAndSelect('employees.test', 'test')
      .take(limit)
      .skip(offset)
      .getMany();
    return companies;
  }

  async findAll(paginationDto: PaginationDto, userLoggedIn: User) {
    const { limit = 10, offset = 0 } = paginationDto;

    const companies = await this.getSearchConditionCompanies(
      limit,
      offset,
      userLoggedIn,
    );

    if (!companies.length) {
      throw new NotFoundException(`Not companies found`);
    }
    return companies;
  }

  getSearchConditionCompany(
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
    } else {
      searchCondition.name = term;
    }

    if (userLoggedIn.role.title === validRoles.consultant) {
      searchCondition.createdBy = userLoggedIn.id;
    }

    return searchCondition;
  }

  async findOne(term: string, userLoggedIn: User): Promise<Company> {
    const searchCondition = this.getSearchConditionCompany(term, userLoggedIn);

    const company = await this.companyRepository.findOneBy(searchCondition);

    if (!company) {
      throw new NotFoundException(
        `Company with search term ${term} not found, doesn't belong or isn't enabled`,
      );
    }

    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    userLoggedIn: User,
  ) {
    const {isActive, ...restUpdateCompanyDto} = updateCompanyDto;
    if (isActive) {
      await this.companyRepository.update(id, {isActive});
    }
    await this.findOne(id, userLoggedIn);
    const company = await this.companyRepository.preload({
      id,
      ...restUpdateCompanyDto,
    });

    try {
      return await this.companyRepository.save(company);
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async remove(id: string, userLoggedIn: User) {
    const company = await this.findOne(id, userLoggedIn);
    company.isActive = false;
    await this.companyRepository.save(company);
    return { message: `Company with id: "${id}" deleted successfully` };
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
