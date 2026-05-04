import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDto } from './form.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async createForm(createFormDto: CreateFormDto) {
    const newForm = this.formRepository.create(createFormDto);
    if (newForm.status !== 'active' && newForm.status !== 'draft') {
      throw new Error("Invalid status. Status must be either 'active' or 'draft'.");
    }
    return this.formRepository.save(newForm);
  }

  async getForms() {
    return this.formRepository.find();
  }

  async getFormById(formId: number) {
    const form = await this.formRepository.findOne({
      where: { form_id: formId },
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
}
