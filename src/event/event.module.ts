import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './services/event/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  controllers: [EventController],
  imports:[
    TypeOrmModule.forFeature([Event])
  ],
  providers: [EventService]
})
export class EventModule {}
