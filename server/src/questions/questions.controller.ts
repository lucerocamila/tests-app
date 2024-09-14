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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@ApiTags('Questions')
@ApiBearerAuth()
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Auth(validRoles.admin, validRoles.consultant)
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @Auth(validRoles.admin, validRoles.consultant)
  @ApiOperation({
    summary: 'Get all questions, only for admin or consultant.',
    description: 'A user with admin or consultant role can get all questions.',
  })
  @ApiResponse({ status: 200, description: 'List of questions' })
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
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a question by id',
    description: 'A user with admin or consultant role can get a question by id.' 
  })
  @ApiResponse({ status: 200, description: 'Test question found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Test question not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a question by id',
    description: 'A user with admin or consultant role can update a question by id.'
  })
  @ApiResponse({ status: 200, description: 'Test question updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Test question not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a question by id',
    description: 'A user with admin or consultant role can delete a question by id.'
  })
  @ApiResponse({ status: 200, description: 'Test question deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 404, description: 'Test question not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.remove(id);
  }
}
