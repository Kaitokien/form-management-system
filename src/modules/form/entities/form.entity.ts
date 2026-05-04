import { Field } from '../../field/entities/field.entity';
import { Submission } from '../../submission/entities/submission.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('forms')
export class Form {
  @PrimaryGeneratedColumn()
  form_id: number;

  @Column({ unique: true, name: 'form_title' })
  title: string;

  @Column({ unique: true, name: 'form_description' })
  description: string;

  @Column({ name: 'form_order' })
  order: number;

  @Column({ name: 'form_status' })
  status: string;

  @Column({ nullable: true, name: 'form_deleted_at' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'form_created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'form_updated_at' })
  updatedAt: Date;

  @OneToMany(() => Field, (field) => field.form)
  fields: Field[];

  @OneToMany(() => Submission, (submission) => submission.form)
  submissions: Submission[];

  @ManyToOne(() => User, (user) => user.forms, { onDelete: 'CASCADE' })
  creator: User
}
