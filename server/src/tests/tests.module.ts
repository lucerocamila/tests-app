import { Module, forwardRef } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TestsController],
  providers: [TestsService],
  imports: [TypeOrmModule.forFeature([Test, User]), AuthModule],
  exports: [TestsService],
})
export class TestsModule {}
