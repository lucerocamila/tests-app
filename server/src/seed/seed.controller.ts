import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Seed')
@ApiBearerAuth()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({
    summary: 'Fill database, only for admin.',
    description:
      'A user with admin role can run a seed to create fake data to test endpoints.',
  })
  @ApiResponse({ status: 200, description: 'Seed executed' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @Auth(validRoles.admin)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSeeds(@GetUser() user: User) {
    return this.seedService.runSeed();
  }
}
