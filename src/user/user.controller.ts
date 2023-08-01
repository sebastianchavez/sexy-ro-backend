import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './services/user/user.service';
import { RequestRegisterUserDto } from './dtos/request-register-user.dto';
import { RequestLoginUserDto } from './dtos/request-login-user.dto';

@Controller('api/users')
export class UserController {

    constructor(
        private userService: UserService
    ){

    }

    @Post('register')
    async register(@Body() body: RequestRegisterUserDto, @Res() res: Response){
        try {
            await this.userService.registerUser(body)
            res.status(HttpStatus.OK).send({message: 'Usuario registrado con éxito'})
        } catch (error) {
            throw error   
        }
    }
}
