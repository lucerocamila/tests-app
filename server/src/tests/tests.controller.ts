import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@ApiTags('Tests')
@ApiBearerAuth()
@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @Auth(validRoles.admin, validRoles.consultant)
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @ApiOperation({
    summary: 'Get all tests type.',
    description: 'A user with admin or consultant role can get all tests type.',
  })
  @ApiResponse({ status: 200, description: 'List of tests type' })
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
  @Get()
  @Auth(validRoles.admin, validRoles.consultant)
  findAll() {
    return this.testsService.findAll();
  }

  @Get(':term')
  @ApiOperation({
    summary: 'Get one test type.',
    description: 'A user with admin or consultant role can get one test type.',
    })
  @ApiResponse({ status: 200, description: 'Test founded' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.testsService.findOne(term);
  }



  @Patch(':id')
  @ApiOperation({
    summary: 'Update one test.',
    description: 'A user with admin or consultant role can update one test type.',
  })
  @ApiResponse({ status: 200, description: 'Test updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @Auth(validRoles.admin, validRoles.consultant)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one test.',
    description: 'A user with admin or consultant role can delete one test type.',
  })
  @ApiResponse({ status: 200, description: 'Test deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testsService.remove(id);
  }
}
