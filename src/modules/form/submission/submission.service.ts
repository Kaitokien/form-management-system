import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { SubmissionValue } from './entities/submission_value.entity';
import { Repository } from 'typeorm';
import { SubmissionDto } from '../dtos/submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
      @InjectRepository(Submission)
      private readonly submissionRepository: Repository<Submission>,
      @InjectRepository(SubmissionValue)
      private readonly submissionValueRepository: Repository<SubmissionValue>,
    ) {}
    
  async getSubmissions() {
    const submissionList = await this.submissionRepository.find({
      relations: ['submissionValues'],
    });
    return submissionList;
  }

  async submitForm(formId: number, employeeId: number, submissionDto: SubmissionDto) {
    // Validate input
    if (!submissionDto || !Array.isArray(submissionDto.FieldValues) || submissionDto.FieldValues.length === 0) {
      return {
        statusCode: 400,
        message: 'Submission data must be a non-empty array.'
      };
    }

    // Create submission values
    const submissionValues = await Promise.all(submissionDto.FieldValues.map(async v =>
      await this.submissionValueRepository.create({
        value: v.value,
        field: { field_id: v.fieldId },
      })
    ));

    // Create the submission
    const submission = this.submissionRepository.create({
      form: { form_id: formId },
      employee: { user_id: employeeId },
      submissionValues: submissionValues,
    });

    // Save the submission
    return await this.submissionRepository.save(submission);
  }
}
