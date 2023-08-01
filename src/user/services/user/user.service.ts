import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm'
import { Account } from '../../entities/account.entity';
import { RequestRegisterUserDto } from 'src/user/dtos/request-register-user.dto';
import * as bcrypt from 'bcrypt-nodejs'
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { IRequestRegisterAccount } from 'src/user/interfaces/request-register-account.interface';
import { IRequestRegisterLogin } from 'src/common/services/cpanel/interfaces/request-register-login.interface';
import { RagnarokServerService } from 'src/ragnarok-server/services/ragnarok-server/ragnarok-server.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        private cpanelService: CpanelService,
        private ragnarokServerService: RagnarokServerService
    ){

    }

    async registerUser(request: RequestRegisterUserDto){
        const { email, genre, password, user } = request
        
        // TODO: validar email con servidor de RO
        const login = await this.cpanelService.getLogin(email)
        if(login){
            throw new HttpException('Ya existe un jugador con este usuario', HttpStatus.BAD_REQUEST)
        }

        // TODO: Si no existe insertar en tabla usuario
        const newUser = new User()
        newUser.email = email;
        newUser.state = 'enabled';
        newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        await this.userRepository.insert(newUser)

        // TODO: registrar usuario en RO
        const requestRegisterAccount: IRequestRegisterLogin = {
            email,
            last_ip: '127.0.0.1',
            sex: genre,
            user_pass: password,
            userid: user
        }
        return this.registerRo(requestRegisterAccount, newUser.idUser)
    }

    async registerRo(request: IRequestRegisterAccount, idUser: number){
        try {
            const responseCPanel = await this.cpanelService.registerLogin(request)
            const account = new Account()
            account.genre = request.sex
            account.ragnarokId = responseCPanel.idUser
            account.idUser = idUser
            const server = await this.ragnarokServerService.findServerById(1)
            account.idServer = server.idServer
            return await this.accountRepository.insert(account)
        } catch (error) {
            throw error
        }
    }

}
