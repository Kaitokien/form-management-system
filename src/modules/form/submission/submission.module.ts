import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { SubmissionValue } from './entities/submission_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, SubmissionValue])],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
