import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestSaveEventDto } from 'src/event/dtos/request-save-event.dto';
import { Event } from '../../entities/event.entity'
import { Like, Repository } from 'typeorm';
import { QueryGetEventsDto } from 'src/event/dtos/query-get-events.dto';
import { RequestUpdateEventDto } from 'src/event/dtos/request-update-event.dto';
import { Message } from 'src/common/enums/messages.enum';

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    ){}

    async getEvents(query: QueryGetEventsDto){
        try {
            const { limit, page, title, type, idServer } = query
            const where = {
                title: Like(`%${title || ''}%`),
                type: Like(`%${type || ''}%`),
                idServer
            }
            const select = {
                createdAt: true,
                days: true,
                description: true,
                title: true,
                endHour: true,
                idEvent: true,
                startHour: true,
                type: true
            }
            
            let events: Event[];
            let totalRegister = 0
            if(limit == 0){
                events = await this.eventRepository.find({ select })
            } else {
                events = await this.eventRepository.find({
                    select,
                    where,
                    take: limit,
                    skip: (limit * page - limit)
                })
        
                totalRegister = await this.eventRepository.count({ where })
            }
            return {
                events,
                totalRegister,
                serverDate: new Date()
            }
        } catch (error) {
            throw error
        }
    }

    saveEvent(request: RequestSaveEventDto){
        const { days, description, endHour, startHour, title, type } = request
        const event = new Event()
        event.days = days
        event.description = description
        event.endHour = endHour
        event.startHour = startHour
        event.title = title
        event.type = type
        return this.eventRepository.insert(event)
    }

    async updateEvent(request: RequestUpdateEventDto){
         try {
            const { days, description, endHour, idEvent, startHour, title, type } = request
            const event = await this.eventRepository.findOneBy({idEvent})
            if(event){
                event.title = title
                event.description = description
                event.type = type
                event.days = days
                event.startHour = startHour
                event.endHour = endHour
                return this.eventRepository.save(event)
            } else {
                throw new HttpException(Message.EVENT_NOT_EXISTS, HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error
         }
    }

    deleteEvent(idEvent: number){
        return this.eventRepository.delete({idEvent})
    }
}
