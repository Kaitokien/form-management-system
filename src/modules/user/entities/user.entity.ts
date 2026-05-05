import { Form } from '../../form/entities/form.entity'
import { Submission } from '../../form/submission/entities/submission.entity'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column({ unique: true, name: 'user_username' })
  username: string

  @Column({ name: 'user_password' })
  password: string

  @Column({ name: 'user_role' })
  userRole: string

  @CreateDateColumn({ name: 'user_created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'user_updated_at' })
  updatedAt: Date

  // Relationship
  @OneToMany(() => Form, (form) => form.creator)
  forms: Form[]

  @OneToMany(() => Submission, (submission) => submission.employee)
  submissions: Submission[]
}
