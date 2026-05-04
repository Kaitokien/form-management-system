import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { FormModule } from './modules/form/form.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'form_management',
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    FormModule,
    SubmissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
