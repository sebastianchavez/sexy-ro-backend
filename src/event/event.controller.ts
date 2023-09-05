import { Controller, Post, Body, Res, HttpStatus, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { EventService } from './services/event/event.service';
import { Response } from 'express';
import { QueryGetEventsDto } from './dtos/query-get-events.dto';

@Controller('api/events')
export class EventController {

    constructor(
        private eventService: EventService
    ){}

    @Get('get-events')
    async getEvents(@Query() query: QueryGetEventsDto, @Res() res: Response){
        try {
            const response = await this.eventService.getEvents(query)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
    
}
