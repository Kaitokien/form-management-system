import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { FormModule } from './modules/form/form.module';
import { FieldModule } from './modules/field/field.module';
import { SubmissionModule } from './modules/submission/submission.module';

@Module({
  imports: [UserModule, FormModule, FieldModule, SubmissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
