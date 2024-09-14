import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../auth/dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/entities';
import { Auth, GetUser } from 'src/auth/decorators';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { validRoles } from 'src/auth/interfaces';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users, only for admin or consultant.',
    description:
      'A user with admin role or consultant role, can get all users.',
  })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
  })
  @Auth(validRoles.admin, validRoles.consultant)
  findAll(
    @Query() paginationDto: PaginationDto,
    @GetUser() userLoggedIn: User,
  ) {
    return this.userService.findAll(paginationDto, userLoggedIn);
  }

  @Get(':term')
  @ApiOperation({
    summary:
      'Get user, only for admin or consultant. Also you can find it by ID, name, or email.',
    description:
      'A user with admin role or consultant role, can get a specific user. Also you can find it by ID, name, or email.',
  })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @Auth(validRoles.admin, validRoles.consultant)
  findOne(
    @Param('term') term: string,
    @GetUser() userLoggedIn: User,
  ) {
    return this.userService.findOne(term, userLoggedIn);
  }

  @Get('role/:term')
  @ApiOperation({
    summary:
      'Get user with role, only for admin. Search it by id, name, or email.',
    description:
      'A user with admin role, can get a specific user and their role. Search it by id, name, or email.',
  })
  @ApiResponse({ status: 200, description: 'User with role found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 404, description: 'User with role not found' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @Auth(validRoles.admin)
  findOneWithRoles(@Param('term') term: string) {
    return this.userService.findOneWithRoles(term);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Update a user, only for admin or consultant. Search it by id to update.',
    description:
      'A user with admin role or consultant role, can update a user. Search it by id to update.',
  })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() userLoggedIn: User,
  ) {
    return this.userService.update(id, updateUserDto, userLoggedIn);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a user, only for admin or consultant. Search it by id to delete.',
    description:
      'A user with admin role or consultant role, can delete a user. Search it by id to delete.',
  })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(validRoles.admin, validRoles.consultant)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() userLoggedIn: User,
  ) {
    return this.userService.remove(id, userLoggedIn);
  }
}
