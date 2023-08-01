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
import * as dotenv from 'dotenv'
import { RequestLoginUserDto } from 'src/user/dtos/request-login-user.dto';
dotenv.config()


const { ID_SERVER } = process.env

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

    async login(request: RequestLoginUserDto){
        const { email, password } = request
        try {
            const user = await this.userRepository.findOne({
                select: {
                    email: true,
                }
            })
        } catch (error) {
            
        }
    }

    async registerUser(request: RequestRegisterUserDto){
        const { email, genre, password, user } = request
        try {
            const login = await this.cpanelService.getLogin(email, user)

            if(login){
                throw new HttpException('Ya existe un jugador con este usuario', HttpStatus.BAD_REQUEST)
            }
    
            const newUser = new User()
            newUser.email = email;
            newUser.state = 'enabled';
            newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            console.log('newUser:', newUser);
            
            await this.userRepository.insert(newUser)
    
            const requestRegisterAccount: IRequestRegisterLogin = {
                email,
                last_ip: '127.0.0.1',
                sex: genre,
                user_pass: password,
                userid: user
            }
            return this.registerRo(requestRegisterAccount, newUser.idUser)
        } catch (error) {
            console.log('ERROR:', error);
            if(error.code == 'ER_DUP_ENTRY'){
                throw new HttpException('Ya existe un jugador con este email', HttpStatus.BAD_REQUEST)
            } else {
                if(error.response && error.status){
                    throw new HttpException(error.response, error.status)
                } else {
                    throw new HttpException('Problemas de conexión, por favor intente más tarde', HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }
        }
    }

    async registerRo(request: IRequestRegisterAccount, idUser: number){
        try {
            const responseCPanel = await this.cpanelService.registerLogin(request)
            const account = new Account()
            account.genre = request.sex
            account.ragnarokId = responseCPanel.idUser
            account.idUser = idUser
            console.log('account:',account);
            console.log('ID_SERVER:',ID_SERVER);
            
            const server = await this.ragnarokServerService.findServerById(Number(ID_SERVER))
            console.log('server:',server);
            
            if(!server){
                throw new HttpException('Servidor inválido', HttpStatus.BAD_REQUEST)
            }
            account.idServer = server.idServer
            return await this.accountRepository.insert(account)
        } catch (error) {
            throw error
        }
    }

}
