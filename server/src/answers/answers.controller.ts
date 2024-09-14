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
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { validRoles } from 'src/auth/interfaces';

@ApiTags('Answers')
@ApiBearerAuth()
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a answer, only for admin or consultant.',
    description: 'A user with admin or consultant role can create a answer.',
  })
  @ApiResponse({ status: 201, description: 'Answer created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all answers, only for admin or consultant.',
    description: 'A user with admin or consultant role can get all answers.',
  })
  @ApiResponse({ status: 200, description: 'List of answers' })
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
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a answer, only for admin or consultant.', 
    description: 'A user with admin or consultant role can get a answer by id.' 
  })
  @ApiResponse({ status: 200, description: 'Answer found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a answer, only for admin or consultant.',
    description: 'A user with admin or consultant role can update a answer by id.'
  })
  @ApiResponse({ status: 200, description: 'Answer updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a answer, only for admin or consultant.',
    description: 'A user with admin or consultant role can delete a answer by id.'
  })
  @ApiResponse({ status: 200, description: 'Answer deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token not valid' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Auth(validRoles.admin, validRoles.consultant)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.answersService.remove(id);
  }
}
