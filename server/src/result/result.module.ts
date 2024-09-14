import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { User } from 'src/auth/entities';
import { Test } from 'src/tests/entities/test.entity';
import { UserModule } from 'src/user/user.module';
import { TestsModule } from 'src/tests/tests.module';

@Module({
  controllers: [ResultController],
  providers: [ResultService],
  imports: [TypeOrmModule.forFeature([Result,Test,User]), UserModule, TestsModule],
})
export class ResultModule {}
