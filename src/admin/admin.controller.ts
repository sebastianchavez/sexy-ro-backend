import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './services/admin/admin.service';
import { RequestRegisterAdminDto } from './dtos/request-register-admin.dto';
import { RequestLoginAdminDto } from './dtos/request-login-admin.dto';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';
import { QueryGetCharsDto } from './dtos/query-get-chars.dto';
import { RequestUpdateEventDto } from 'src/event/dtos/request-update-event.dto';
import { RequestSaveEventDto } from 'src/event/dtos/request-save-event.dto';
import { QueryGetEventsDto } from 'src/event/dtos/query-get-events.dto';
import { EventService } from 'src/event/services/event/event.service';

@Controller('api/admins')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private ragnarokCharService: RagnarokCharService,
    private eventService: EventService,
    ) {}

  @Post('register')
  async register(@Body() body: RequestRegisterAdminDto, @Res() res: Response) {
    try {
      await this.adminService.register(body);
      res.status(HttpStatus.OK).send({ message: 'Administrador registrado' });
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: RequestLoginAdminDto, @Res() res: Response) {
    try {
      const data = await this.adminService.login(body);
      res.status(HttpStatus.OK).send({ message: 'Usuario autenticado', data });
    } catch (error) {
      throw error;
    }
  }

  @Get('get-admins')
  async getAdmins(@Res() res: Response){
    try {
      const admins = await this.adminService.getAdmins()
      res.status(HttpStatus.OK).send({message: 'Admins', admins})
    } catch (error) {
      throw error
    }
  }

  @Get('get-chars')
  async getChars(@Query() query: QueryGetCharsDto, @Res() res: Response){
    try {
      const data = await this.ragnarokCharService.getChars(query)
      res.status(HttpStatus.OK).send({ message: 'Chars', data });
    } catch (error) {
      throw error
    }
  }

  @Get('get-events')
    async getEvents(@Query() query: QueryGetEventsDto, @Res() res: Response){
        try {
            const response = await this.eventService.getEvents(query)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('save-event')
    async saveEvent(@Body() body: RequestSaveEventDto, @Res() res: Response){
        try {
            const response = await this.eventService.saveEvent(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('update-event')
    async updateEvent(@Body() body: RequestUpdateEventDto, @Res() res: Response){
        try {
            const response = await this.eventService.updateEvent(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Delete('delete-event/:id')
    async deleteEvent(@Param('id') id: number, @Res() res: Response){
        try {
            const response = await this.eventService.deleteEvent(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
          throw error
        }
    }
}
