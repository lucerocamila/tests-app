import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { Role, User } from './entities';
import { JwtPayLoad, validRoles } from './interfaces';
import { Company } from 'src/company/entities/company.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto, userLoggedIn: User) {
    const { password, companyId, roleTitle, ...userData } = createUserDto;

    let user: User;

    if (companyId) {
      const company = await this.companyRepository.findOneBy({
        id: companyId,
      });
      if (!company) {
        throw new BadRequestException(
          `Company ${companyId} not found, please check all companies in the database and enter a valid company id. If company isn't exist yet, register it first. If the user is not related to a company yo dont need to send a country id`,
        );
      }
      user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        company,
      })
    } else if (!companyId) {
      user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      })
    }


    if (userLoggedIn.role.title === validRoles.admin) {
      if (roleTitle) {
        const role = await this.roleRepository.findOneBy({
          title: roleTitle,
        });
        user.role = role;
      }
    }

    if (userLoggedIn.role.title === validRoles.consultant) {
      if (roleTitle && roleTitle !== validRoles.user) {
        throw new BadRequestException(
          'consultant users can only register users with role user',
        );
      }
      const userRole = await this.roleRepository.findOneBy({
        title: validRoles.user,
      });
      user.role = userRole;
    }

    user.createdBy = userLoggedIn.id;

    try {
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
      relations: { role: true },
    });
    if (!user)
      throw new BadRequestException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Credentials are not valid (password)');

    delete user.password;

    if (user.role.title === validRoles.user) {
      const finalUser = await this.userRepository.createQueryBuilder('user')
        .where('user.id = :id', { id: user.id })
        .leftJoinAndSelect('user.role', 'role', 'role.isActive = :isActive', { isActive: true })
        .leftJoinAndSelect('user.company', 'company', 'company.isActive = :isActive', { isActive: true })
        .leftJoinAndSelect('user.test', 'test', 'test.isActive = :isActive', { isActive: true })
        .leftJoinAndSelect('test.question', 'question', 'question.isActive = :isActive', { isActive: true })
        .leftJoinAndSelect('test.result', 'result', 'result.user.id = :id', { id: user.id })
        .leftJoinAndSelect('question.answer', 'answer', 'answer.isActive = :isActive', { isActive: true })
        .getOne();

      delete finalUser.password;
      return {
        ...finalUser,
        token: this.getJwtToken({ id: user.id }),
      }
    }

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayLoad) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
