import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { TokenService } from 'src/common/services/token/token.service';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    HttpModule
  ],
  controllers: [AdminController],
  providers: [AdminService, TokenService, RagnarokCharService, CpanelService],
  exports: [TypeOrmModule],
})
export class AdminModule {}
