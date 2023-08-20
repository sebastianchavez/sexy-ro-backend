import { Controller, Post, Body, Res, HttpStatus, Get, Query, Put, Delete, Param } from '@nestjs/common';
import { EventService } from './services/event/event.service';
import { Response } from 'express';
import { RequestSaveEventDto } from './dtos/request-save-event.dto';
import { RequestUpdateEventDto } from './dtos/request-update-event.dto';
import { QueryGetEventsDto } from './dtos/query-get-events.dto';

@Controller('api/events')
export class EventController {

    constructor(
        private eventService: EventService
    ){}

    
}
