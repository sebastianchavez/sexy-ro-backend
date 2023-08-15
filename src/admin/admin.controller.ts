import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './services/admin/admin.service';
import { RequestRegisterAdminDto } from './dtos/request-register-admin.dto';
import { RequestLoginAdminDto } from './dtos/request-login-admin.dto';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';
import { QueryGetCharsDto } from './dtos/query-get-chars.dto';

@Controller('api/admins')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private ragnarokCharService: RagnarokCharService
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

  @Get('get-chars')
  async getChars(@Query() query: QueryGetCharsDto, @Res() res: Response){
    try {
      const data = await this.ragnarokCharService.getChars(query)
      res.status(HttpStatus.OK).send({ message: 'Chars', data });
    } catch (error) {
      throw error
    }
  }
}
