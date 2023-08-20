import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { TokenService } from 'src/common/services/token/token.service';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';
import { EventService } from 'src/event/services/event/event.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Event]),
    HttpModule
  ],
  controllers: [AdminController],
  providers: [AdminService, TokenService, RagnarokCharService, CpanelService, EventService],
  exports: [TypeOrmModule],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/admins/login', method: RequestMethod.POST },
      )
      .forRoutes('api/admins/');
  }
}