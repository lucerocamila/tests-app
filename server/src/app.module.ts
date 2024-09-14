import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { CompanyModule } from './company/company.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { TestsModule } from './tests/tests.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    AuthModule,
    UserModule,
    CommonModule,
    SeedModule,
    CompanyModule,
    QuestionsModule,
    AnswersModule,
    TestsModule,
    ResultModule,
  ],
})
export class AppModule { }
