import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FormService } from './form.service';
import { CreateFormDto } from './dtos/form.dto';
import { CreateFieldDto } from './dtos/field.dto';

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

  @Post(':formId/fields')
  async addFieldToForm(@Param('formId') formId: number, @Body() createFieldDto: CreateFieldDto) {
    return this.formService.addFieldToForm(formId, createFieldDto);
  }

  @Put(':formId/fields/:fieldId')
  async updateField(@Param('fieldId') fieldId: number, @Body() updateFieldDto: CreateFieldDto) {
    return this.formService.updateField(fieldId, updateFieldDto);
  }

  @Delete(':formId/fields/:fieldId')
  async deleteField(@Param('fieldId') fieldId: number) {
    return this.formService.deleteField(fieldId);
  }

}
