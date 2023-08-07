import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm'
import { Account } from '../../entities/account.entity';
import { RequestRegisterUserDto } from 'src/user/dtos/request-register-user.dto';
import * as bcrypt from 'bcrypt-nodejs'
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { IRequestRegisterAccount } from 'src/user/interfaces/request-register-account.interface';
import { IRequestRegisterLogin } from 'src/common/interfaces/request-register-login.interface';
import { RagnarokServerService } from 'src/ragnarok-server/services/ragnarok-server/ragnarok-server.service';
import * as dotenv from 'dotenv'
import { RequestLoginUserDto } from 'src/user/dtos/request-login-user.dto';
import { StateUser } from 'src/common/enums/user.enum';
import { TokenService } from 'src/common/services/token/token.service';
import { Message } from 'src/common/enums/messages.enum';
import { QueryGetAccountsDto } from 'src/user/dtos/query-get-accounts.dto';
import { RequestRegisterAccountDto } from 'src/user/dtos/request-register-account.dto';
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
        private ragnarokServerService: RagnarokServerService,
        private tokenService: TokenService
    ){

    }

    async login(request: RequestLoginUserDto){
        const { email, password } = request
        try {
            const user = await this.userRepository.findOne({
                select: {
                    email: true,
                    password: true,
                    idUser: true,
                    state: true
                },
                where: {
                    email
                }
            })
            if(user) {
                if(bcrypt.compareSync(password, user.password)){
                    if(user.state == StateUser.ENABLED){
                        const accessToken = this.tokenService.createToken(user)
                        const response = {
                            accessToken,
                            user: {
                                email: user.email
                            }
                        }
                        return response
                    } else {
                        throw new HttpException(Message.DISABLED_USER, HttpStatus.UNAUTHORIZED)
                    }
                } else {
                    throw new HttpException(Message.INVALID_PASSWORD, HttpStatus.BAD_REQUEST)
                }
            } else {
                throw new HttpException(Message.INVALID_USER, HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            if(error.response && error.status && error.status != HttpStatus.INTERNAL_SERVER_ERROR){
                throw error
            } else {
                throw new HttpException(Message.DEFAULT_EXCEPTION, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async getAccounts(req: any, query: QueryGetAccountsDto){
        try {
            const { user: { email } } = req
            const { limit, page } = query
            const queryParams = `?email=${email}&limit=${limit}&page=${page}`
            return this.cpanelService.getLogins(queryParams)
        } catch (error) {
            throw error
        }
    }

    async registerUser(request: RequestRegisterUserDto){
        const { email, genre, password, user } = request
        try {
            const login = await this.cpanelService.getLogin(email, user)

            if(login){
                throw new HttpException(Message.DUPLICATE_EMAIL_USER, HttpStatus.BAD_REQUEST)
            }
    
            const newUser = new User()
            newUser.email = email;
            newUser.state = StateUser.ENABLED;
            newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            
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
            if(error.code == 'ER_DUP_ENTRY'){
                throw new HttpException(Message.DUPLICATE_EMAIL, HttpStatus.BAD_REQUEST)
            } else {
                if(error.response && error.status != HttpStatus.INTERNAL_SERVER_ERROR  && error.response['data']){
                    throw error.response['data']
                } else if(error.response && error.status != HttpStatus.INTERNAL_SERVER_ERROR) {
                    throw error
                } else {
                    throw new HttpException(Message.DEFAULT_EXCEPTION, HttpStatus.INTERNAL_SERVER_ERROR)
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
            
            const server = await this.ragnarokServerService.findServerById(Number(ID_SERVER))
            
            if(!server){
                throw new HttpException(Message.INVALID_SERVER, HttpStatus.BAD_REQUEST)
            }
            account.idServer = server.idServer
            return await this.accountRepository.insert(account)
        } catch (error) {
            throw error
        }
    }

    async registerAccount(request: RequestRegisterAccountDto, req: any){
        const { user: { email, isUser } } = req
        const requestCpanel: IRequestRegisterAccount = {
            ...request,
            email
        }
        try {
            const response = await this.registerRo(requestCpanel, isUser)
            return response
        } catch (error) {
            console.log('ERROR:', error.response);
            
            if(error.code == 'ER_DUP_ENTRY'){
                throw new HttpException(Message.DUPLICATE_EMAIL, HttpStatus.BAD_REQUEST)
            } else {
                if(error.response && error.status != HttpStatus.INTERNAL_SERVER_ERROR  && error.response['data']){
                    throw error.response['data']
                } else if(error.response && error.status != HttpStatus.INTERNAL_SERVER_ERROR) {
                    throw error
                } else {
                    throw new HttpException(Message.DEFAULT_EXCEPTION, HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }
        }

    }
}
