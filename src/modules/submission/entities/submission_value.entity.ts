import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Submission } from './submission.entity';

@Entity('submission_values')
export class SubmissionValue {
  @PrimaryGeneratedColumn()
  subVal_id: number;

  @Column({ name: 'subVal_id_form' })
  formId: number;

  @Column({ name: 'subVal_value' })
  value: string;

  @CreateDateColumn({ name: 'subVal_created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'subVal_updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Submission, (submission) => submission.submissionValues, { onDelete: 'CASCADE' })
  submission: Submission;
}
