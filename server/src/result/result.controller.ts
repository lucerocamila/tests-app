import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Result')
@ApiBearerAuth()
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new result', description: 'Create a new result for a test.' })
  @ApiResponse({ status: 201, description: 'Result created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all results, only for admin or consultant.',
    description: 'A user with admin or consultant role can get all tests result.',
  })
  @ApiResponse({ status: 200, description: 'List of tests result' })
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
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a result by id', description: 'Get a result by id.' })
   @ApiResponse({ status: 200, description: 'Result found successfully' })
   @ApiResponse({ status: 400, description: 'Bad request' })
   @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
   @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
   @ApiResponse({ status: 404, description: 'Not found' })
   @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.resultService.findOne(id);
  }

}
