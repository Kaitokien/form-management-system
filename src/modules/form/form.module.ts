import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Field } from './entities/field.entity';
import { Submission } from './submission/entities/submission.entity';
import { SubmissionValue } from './submission/entities/submission_value.entity';
import { SubmissionService } from './submission/submission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Field, Submission, SubmissionValue])],
  controllers: [FormController],
  providers: [FormService, SubmissionService],
})
export class FormModule {}
