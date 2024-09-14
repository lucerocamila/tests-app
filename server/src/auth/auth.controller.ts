import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateRoleDto,
  CreateUserDto,
  LoginUserDto,
  UpdateRoleDto,
} from './dto';
import { Auth, GetUser } from './decorators';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { validRoles } from './interfaces';
import { RoleService } from './services';
import { User } from './entities';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @ApiTags('Auth')
  @Post('register/')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User register, only for admin or consultant.',
    description:
      'A user with admin role can create any user with consultant role or user role. A user with consultant role, can create a user with "user" role by default',
  })
  @ApiResponse({ status: 201, description: 'User was created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.consultant, validRoles.admin)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @GetUser() userLoggedIn: User,
  ) {
    return this.authService.create(createUserDto, userLoggedIn);
  }

  @ApiTags('Auth')
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Logged in' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, check credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @ApiTags('Roles')
  // @Get('role')
  // @ApiOperation({
  //   summary: 'Get all the roles availables, only for admin',
  //   description: 'A user with admin role can get all the roles availables',
  // })
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: 'OK' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // @Auth(validRoles.admin)
  // getRoles() {
  //   return this.roleService.getRoles();
  // }

  // @ApiTags('Roles')
  // @Get('role/:term')
  // @ApiOperation({
  //   summary:
  //     'Get a specific role, only for admin. Search for it by id or name.',
  //   description:
  //     'A user with admin role can get a specific role.  Search for it by id or name.',
  // })
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: 'OK' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  // @ApiResponse({ status: 404, description: 'role not found' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // @Auth(validRoles.admin)
  // getRolesByTerm(@Param('term') term: string) {
  //   return this.roleService.findRole(term);
  // }

  // @ApiTags('Roles')
  // @Post('role')
  // @ApiOperation({
  //   summary: 'Create a role, only for admin',
  //   description: 'A user with admin role can create a role',
  // })
  // @ApiBearerAuth()
  // @ApiResponse({ status: 201, description: 'Role created!' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // @Auth(validRoles.admin)
  // createRole(@Body() createRoleDto: CreateRoleDto) {
  //   return this.roleService.createRole(createRoleDto);
  // }

  // @ApiTags('Roles')
  // @Patch('role/:term')
  // @ApiOperation({
  //   summary:
  //     'Update a role, only for admin. Search for it by id or name to update.',
  //   description:
  //     'A user with admin role can update a role. Search for it by id or name to update.',
  // })
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: 'Role updated' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  // @ApiResponse({ status: 404, description: 'role not found' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // @Auth(validRoles.admin)
  // updateRole(
  //   @Param('term') term: string,
  //   @Body() updateRoleDto: UpdateRoleDto,
  // ) {
  //   return this.roleService.updateRole(updateRoleDto, term);
  // }

  // @ApiTags('Roles')
  // @Delete('role/:id')
  // @ApiOperation({
  //   summary:
  //     'Delete a role, only for admin. Search for it by id or name to delete.',
  //   description:
  //     'A user with admin role can delete a role. Search for it by id or name to delete.',
  // })
  // @ApiBearerAuth()
  // @ApiResponse({ status: 200, description: 'Role deleted' })
  // @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  // @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  // @ApiResponse({ status: 404, description: 'role not found' })
  // @ApiResponse({ status: 500, description: 'Internal server error' })
  // @Auth(validRoles.admin)
  // deleteRole(@Param('id') id: number) {
  //   return this.roleService.deleteRole(id);
  // }
}
