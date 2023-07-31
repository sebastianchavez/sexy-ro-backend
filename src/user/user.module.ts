import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, Account])
  ],
  providers: [UserService]
})
export class UserModule {}
