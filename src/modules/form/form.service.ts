import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dtos/form.dto';
import { CreateFieldDto } from './dtos/field.dto';
import { Field } from './entities/field.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  async createForm(createFormDto: CreateFormDto) {
    const newForm = this.formRepository.create(createFormDto);
    if (newForm.status !== 'active' && newForm.status !== 'draft') {
      throw new Error(
        "Invalid status. Status must be either 'active' or 'draft'.",
      );
    }

    // Check if the order
    return this.formRepository.save(newForm);
  }

  async getForms() {
    return this.formRepository.find();
  }

  async getFormById(formId: number) {
    const form = await this.formRepository.findOne({
      where: { form_id: formId },
      relations: ['fields'],
    });
    if (!form) {
      throw new Error(
        'Form not found. This form is either deleted or does not exist.',
      );
    }
    return form;
  }

  async updateForm(formId: number, updateFormDto: CreateFormDto) {
    const form = await this.formRepository.findOne({
      where: { form_id: formId },
    });
    if (!form) {
      throw new Error(
        'Form not found. This form is either deleted or does not exist.',
      );
    }
    this.formRepository.merge(form, updateFormDto);
    return this.formRepository.save(form);
  }

  async deleteForm(formId: number) {
    const form = await this.formRepository.findOne({
      where: { form_id: formId },
    });
    if (!form) {
      throw new Error(
        'Form not found. This form is either deleted or does not exist.',
      );
    }
    form.deletedAt = new Date();
    return this.formRepository.save(form);
  }

  async addFieldToForm(formId: number, createFieldDto: CreateFieldDto) {
    const form = await this.getFormById(formId);
    const existingFieldOrder = await this.fieldRepository.findOne({
      where: { order: createFieldDto.order, form: { form_id: formId } },
    });
    if (existingFieldOrder) {
      return {
        statusCode: 400,
        message: 'A field with this order already exists in this form.',
      };
    }
    if ( createFieldDto.type !== 'text' && createFieldDto.type !== 'number' && createFieldDto.type !== 'date' && createFieldDto.type !== 'color' && createFieldDto.type !== 'select' ) {
      return {
        statusCode: 400,
        message:
          "Invalid field type. Type must be one of 'text', 'number', 'date', 'color', or 'select'.",
      };
    }

    if (createFieldDto.type === 'select') {
      if (!createFieldDto.options) {
        return {
          statusCode: 400,
          message: "Options are required for 'select' field type.",
        }
      }
    }
    const newField = this.fieldRepository.create({
      label: createFieldDto.label,
      type: createFieldDto.type,
      order: createFieldDto.order,
      required: createFieldDto.required,
      options: createFieldDto.options?.trim(),
      form: form,
    });
    await this.fieldRepository.save(newField);
    return {
      statusCode: 201,
      message: 'Field added to form successfully.',
    };
  }

  async updateField(fieldId: number, updateFieldDto: CreateFieldDto) {
    const field = await this.fieldRepository.findOne({
      where: { field_id: fieldId },
    });
    if (!field) {
      throw new Error(
        'Field not found. This field is either deleted or does not exist.',
      );
    }
    this.fieldRepository.merge(field, updateFieldDto);
    return this.fieldRepository.save(field);
  }

  async deleteField(fieldId: number) {
    const field = await this.fieldRepository.findOne({
      where: { field_id: fieldId },
    });
    if (!field) {
      throw new Error(
        'Field not found. This field is either deleted or does not exist.',
      );
    }
    field.deletedAt = new Date();
    return this.fieldRepository.save(field);
  }
}
