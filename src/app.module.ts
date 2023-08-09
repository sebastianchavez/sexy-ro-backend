import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/db.config';
import { RagnarokServerModule } from './ragnarok-server/ragnarok-server.module';
import { CpanelService } from './common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios'
import { TokenService } from './common/services/token/token.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(db),
    RagnarokServerModule,
    HttpModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService, CpanelService, TokenService],
})
export class AppModule {}
