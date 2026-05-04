import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Field } from './entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Field])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
