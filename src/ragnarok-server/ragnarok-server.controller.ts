import { Body, Controller, Res, Post, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RagnarokServerService } from './services/ragnarok-server/ragnarok-server.service';
import { RequestSaveServerDto } from './dtos/request-save-server.dto';

@Controller('api/ragnarok-server')
export class RagnarokServerController {
  constructor(private ragnarokServerService: RagnarokServerService) {}

  @Post('register')
  async register(@Body() body: RequestSaveServerDto, @Res() res: Response) {
    try {
      await this.ragnarokServerService.saveServer(body);
      res
        .status(HttpStatus.OK)
        .send({ message: 'Servidor registrasdo con éxito' });
    } catch (error) {
      throw error;
    }
  }
}
