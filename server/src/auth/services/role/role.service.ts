import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/auth/entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateRoleDto } from '../../dto/role-dto/create-role.dto';
import { UpdateRoleDto } from 'src/auth/dto';
import { validRoles } from 'src/auth/interfaces';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createStaticRoles();
    await this.createStaticUserAdmin();
  }

  private async createStaticRoles() {
    const roles = await this.configService.get('DEFAULT_ROLES').split(' ');
    for (const roleName of roles) {
      const role = await this.roleRepository.findOne({
        where: { title: roleName },
      });
      if (!role) {
        if (roleName === validRoles.admin) {
          const role = this.roleRepository.create({
            title: roleName,
          });
          await this.roleRepository.save(role);
        } else if (roleName === validRoles.consultant) {
          const role = this.roleRepository.create({
            title: roleName,
          });
          await this.roleRepository.save(role);
        } else if (roleName === validRoles.user) {
          const role = this.roleRepository.create({
            title: roleName,
          });
          await this.roleRepository.save(role);
        }
      }
    }
  }

  private async createStaticUserAdmin() {
    const adminRole = await this.roleRepository.findOne({
      where: { title: validRoles.admin },
    });

    if (!adminRole) {
      console.error("El rol 'admin' no existe.");
      return;
    }

    const adminUser = await this.userRepository.findOne({
      where: { email: this.configService.get('EMAIL_ADMIN') },
    });

    const password = this.configService.get('PASS_ADMIN');

    if (!adminUser) {
      const user = this.userRepository.create({
        email: this.configService.get('EMAIL_ADMIN'),
        password: bcrypt.hashSync(password, 10),
        fullName: this.configService.get('USER_ADMIN'),
        role: adminRole,
      });
      await this.userRepository.save(user);
    }
  }

  // async createRole(createRoleDto: CreateRoleDto) {
  //   try {
  //     const role = this.roleRepository.create({
  //       ...createRoleDto,
  //     });

  //     await this.roleRepository.save(role);

  //     return role;
  //   } catch (error) {
  //     this.handleDBErrors(error);
  //   }
  // }

  // async getRoles() {
  //   const queryBuilder = this.roleRepository.createQueryBuilder('role');
  //   const roles = await queryBuilder.getMany();
  //   return roles;
  // }

  // async findRole(term: string) {
  //   let role: Role;
  //   if (Number(term)) {
  //     role = await this.roleRepository.findOneBy({ id: +term });
  //   } else {
  //     role = await this.roleRepository.findOneBy({ title: term });
  //   }
  //   if (!role) {
  //     throw new NotFoundException(`Role with term: ${term} not found`);
  //   }
  //   return role;
  // }

  // async updateRole(updateRoleDto: UpdateRoleDto, term: string) {
  //   // Buscar el rol a actualizar
  //   const role = await this.findRole(term);

  //   if (role) {
  //     try {
  //       role.title = updateRoleDto.title;
  //       await this.roleRepository.save(role);
  //       return role;
  //     } catch (error) {
  //       this.handleDBErrors(error);
  //     }
  //   } else {
  //     return { message: `Role with term: ${term} not found` };
  //   }
  // }

  // async deleteRole(id: number) {
  //   const role = await this.findRole(id.toString());
  //   try {
  //     role.isActive = false;
  //     await this.roleRepository.save(role);
  //     return { message: 'Role deleted', role: role };
  //   } catch (error) {
  //     this.handleDBErrors(error);
  //   }
  // }

  // private handleDBErrors(error: any): never {
  //   if (error.code === '23505') {
  //     throw new BadRequestException(error.detail);
  //   }
  //   throw new InternalServerErrorException('Please check server logs');
  // }
}
