import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { validRoles } from 'src/auth/interfaces';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/entities';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({
    summary: 'Register a company, only for consultant or admin.',
    description:
      'A user with consultant role or admin role, can register a company',
  })
  @ApiResponse({ status: 201, description: 'Company was created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.consultant, validRoles.admin)
  create(@Body() createCompanyDto: CreateCompanyDto, @GetUser() user: User) {
    return this.companyService.create(createCompanyDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all companies, only for consultant or admin.',
    description:
      'A user with consultant role or admin role, can get all companies.',
  })
  @ApiResponse({ status: 200, description: 'List of companies' })
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
  @Auth(validRoles.consultant, validRoles.admin)
  findAll(
    @Query() paginationDto: PaginationDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() user: User,
  ) {
    return this.companyService.findAll(paginationDto, user);
  }

  @ApiOperation({
    summary:
      'Get company, only for consultant or admin. You can also find it by ID, name, or email.',
    description:
      'A user with consultant role or admin role, can get a specific company, you can also find it by ID, name, or email.',
  })
  @ApiResponse({ status: 200, description: 'Company found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @Auth(validRoles.consultant, validRoles.admin)
  @Get(':term')
  findOne(@Param('term') term: string, @GetUser() userLoggedIn: User) {
    return this.companyService.findOne(term, userLoggedIn);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Update a company, only for consultant or admin. Search for it by id to update.',
    description:
      'A user with consultant role or admin role can update a company. Search for it by id to update.',
  })
  @ApiResponse({ status: 200, description: 'Company updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.consultant, validRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a company, only for consultant or admin. Search for it by id to delete.',
    description:
      'A user with consultant role or admin role can delete a company. Search for it by id to delete.',
  })
  @ApiResponse({ status: 200, description: 'Company deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @Auth(validRoles.consultant, validRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.companyService.remove(id, user);
  }
}
