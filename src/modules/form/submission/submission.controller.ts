import { Controller, Get } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  async getSubmissions() {
    
  }
}
