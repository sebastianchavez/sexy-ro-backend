import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import * as moment from 'moment'
import * as jwt from 'jwt-simple'
import * as dotenv from 'dotenv'
import { Admin } from 'src/admin/entities/admin.entity';
dotenv.config()
const { SECRET_TOKEN } = process.env

@Injectable()
export class TokenService {

    createToken(user: User) {
        const payload = {
            sub: {
                idUser: user.idUser,
                email: user.email
            },
            iat: moment().unix(),
            exp: moment().add(1, 'hour').unix()
        }

        return jwt.encode(payload, SECRET_TOKEN)
    }

    createTokenAdmin(admin: Admin){
        const payload = {
            sub: {
                idAdmin: admin.idAdmin,
                email: admin.email
            },
            iat: moment().unix(),
            exp: moment().add(1, 'hour').unix()
        }

        return jwt.encode(payload, SECRET_TOKEN)
    }

    decodeToken(token){
        return new Promise((resolve, reject) => {
                const payload = jwt.decode(token, SECRET_TOKEN)
                if(payload.exp <= moment().unix()){
                    reject({
                        status: HttpStatus.UNAUTHORIZED,
                        message: 'La sesión ha expirado'
                    })
                } else {
                    resolve(payload.sub)
                }
           
        })
    }
}
