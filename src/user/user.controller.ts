import { Controller, Post, Body, Res, HttpStatus, Get, Query, Req } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './services/user/user.service';
import { RequestRegisterUserDto } from './dtos/request-register-user.dto';
import { RequestLoginUserDto } from './dtos/request-login-user.dto';
import { QueryGetAccountsDto } from './dtos/query-get-accounts.dto';
import { RequestRegisterAccountDto } from './dtos/request-register-account.dto';

@Controller('api/users')
export class UserController {

    constructor(
        private userService: UserService
    ){

    }

    @Post('login')
    async login(@Body() body: RequestLoginUserDto, @Res() res: Response){
        try {
            const data = await this.userService.login(body)
            res.status(HttpStatus.OK).send({message: 'Usuario autenticado', data})
        } catch (error) {
            throw error   
        }
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

    @Get('get-accounts')
    async getAccounts(@Query() query: QueryGetAccountsDto, @Req() req: any, @Res() res: Response){
        try {
            const response = await this.userService.getAccounts(req, query)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('register-account')
    async registerAccount(@Body() body: RequestRegisterAccountDto, @Req() req: any, @Res() res: Response){
        try {
            await this.userService.registerAccount(body, req)
            res.status(HttpStatus.OK).send({message: 'Usuario registrado con éxito'})
        } catch (error) {
            throw error
        }
    }
}
