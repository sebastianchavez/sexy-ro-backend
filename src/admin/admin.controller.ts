import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './services/admin/admin.service';
import { RequestRegisterAdminDto } from './dtos/request-register-admin.dto';
import { RequestLoginAdminDto } from './dtos/request-login-admin.dto';

@Controller('api/admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

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
}
