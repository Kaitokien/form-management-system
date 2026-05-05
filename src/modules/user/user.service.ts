import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser() {
    const userAdmin = await this.userRepository.create({
      username: 'admin',
      password: 'admin',
      userRole: 'admin',
    });
    const userEmployee = await this.userRepository.create({
      username: 'employee',
      password: '123',
      userRole: 'employee'
    });
    const userEmployee2 = await this.userRepository.create({
      username: 'employee2',
      password: '123',
      userRole: 'employee'
    });
    await this.userRepository.save([userAdmin, userEmployee, userEmployee2]);
  }
}
