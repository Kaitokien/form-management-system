import { Form } from '../../form/entities/form.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SubmissionValue } from './submission_value.entity';
import { User } from '../../user/entities/user.entity';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  submission_id: number;

  @Column({ name: 'submission_id_employee' })
  employeeId: number;

  @Column({ name: 'submission_user_id' })
  userId: number;

  @Column({ name: 'submission_id_form' })
  formId: number;

  @CreateDateColumn({ name: 'submission_created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'submission_updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Form, (form) => form.submissions)
  form: Form;

  @ManyToOne(() => User, (user) => user.submissions)
  employee: User;

  @OneToMany(
    () => SubmissionValue,
    (submissionValue) => submissionValue.submission,
    { cascade: true },
  )
  submissionValues: SubmissionValue[];
}
