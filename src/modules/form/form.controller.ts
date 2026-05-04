import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FormService } from './form.service';
import { CreateFormDto } from './form.dto';

@ApiTags('Forms')
@Controller('api/forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  async getForms() {
    return this.formService.getForms();
  }

  // Create a new form
  @Post()
  async createForm(@Body() createFormDto: CreateFormDto) {
    return this.formService.createForm(createFormDto);
  }

  @Post(':formId')
  async getFormById(@Param('formId') formId: number) {
    return this.formService.getFormById(formId);
  }

  @Put(':formId')
  async updateForm(@Param('formId') formId: number, @Body() updateFormDto: CreateFormDto) {
    return this.formService.updateForm(formId, updateFormDto);
  }

  @Delete(':formId')
  async deleteForm(@Param('formId') formId: number) {
    return this.formService.deleteForm(formId);
  }

}
