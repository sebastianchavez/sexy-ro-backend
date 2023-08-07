import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { TokenService } from "../services/token/token.service";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private tokenService: TokenService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        if(!req.headers.authorization){
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tiene autorización' })
        }
        const authorization = req.headers.authorization.split(' ')
        if(authorization[0] != 'Bearer'){
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tiene autorización' })
        }

        try {
            const response = await this.tokenService.decodeToken(authorization[1])
            req['user'] = response
            next()
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Falló autenticación de token' })
        }
    }
}