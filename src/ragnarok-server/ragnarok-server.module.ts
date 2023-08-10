import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RagnarokServer } from './entities/ragnarokserver.entity';
import { RagnarokServerController } from './ragnarok-server.controller';
import { RagnarokServerService } from './services/ragnarok-server/ragnarok-server.service';

@Module({
  imports: [TypeOrmModule.forFeature([RagnarokServer])],
  exports: [TypeOrmModule],
  controllers: [RagnarokServerController],
  providers: [RagnarokServerService],
})
export class RagnarokServerModule {}
