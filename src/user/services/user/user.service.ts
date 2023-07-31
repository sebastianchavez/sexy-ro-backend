import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm'
import { Account } from '../../entities/account.entity';
import { RequestRegisterUserDto } from 'src/user/dtos/request-register-user.dto';
import * as bcrypt from 'bcrypt-nodejs'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ){

    }

    async registerUser(request: RequestRegisterUserDto){
        const { email, genre, password, user } = request
        
        // TODO: validar email con servidor de RO

        // TODO: Si no existe insertar en tabla usuario
        const newUser = new User()
        newUser.email = email;
        newUser.state = 'enabled';
        newUser.password = bcrypt.hashSync(password, bcrypt.getSaltSync(10));
        await this.userRepository.insert(newUser)

        // TODO: registrar usuario en RO
        
        // return this.registerRo()
    }

    // registerRo(request: IRequestRegisterLogin, idUser: number){

    // }

}
