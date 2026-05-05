import { Form } from '../../form/entities/form.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { SubmissionValue } from '../submission/entities/submission_value.entity';

@Entity('fields')
export class Field {
  @PrimaryGeneratedColumn()
  field_id: number;

  @Column({ name: 'field_label' })
  label: string;

  @Column({ name: 'field_type' })
  type: string;

  @Column({ name: 'field_order' })
  order: number;

  @Column({ name: 'field_required' })
  required: boolean;

  @Column({ nullable: true, name: 'field_options' })
  options: string;

  @CreateDateColumn({ name: 'field_created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'field_updated_at' })
  updatedAt: Date;

  @Column({ nullable: true, name: 'field_deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Form, (form) => form.fields, { onDelete: 'CASCADE' })
  form: Form;

  @OneToMany(() => SubmissionValue, (submissionValue) => submissionValue.field)
  submissionValues: SubmissionValue[];
}
