import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';
import { RagnarokServerService } from 'src/ragnarok-server/services/ragnarok-server/ragnarok-server.service';
import { RagnarokServer } from 'src/ragnarok-server/entities/ragnarokserver.entity';
import { TokenService } from 'src/common/services/token/token.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, Account, RagnarokServer]),
    HttpModule
  ],
  providers: [UserService, CpanelService, RagnarokServerService, TokenService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/users/register', method: RequestMethod.POST },
        { path: 'api/users/login', method: RequestMethod.POST }
      )
      .forRoutes('api/users/')
  }
}
