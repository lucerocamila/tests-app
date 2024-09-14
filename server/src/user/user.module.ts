import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';
import { AuthModule } from 'src/auth/auth.module';
import { TestsModule } from 'src/tests/tests.module';
import { Test } from 'src/tests/entities/test.entity';
import { Company } from 'src/company/entities/company.entity';
import { CompanyModule } from 'src/company/company.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, Test, Company]), AuthModule, TestsModule, CompanyModule],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
