import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestRegisterAdminDto } from 'src/admin/dtos/request-register-admin.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';
import { RequestLoginAdminDto } from 'src/admin/dtos/request-login-admin.dto';
import { Message } from 'src/common/enums/messages.enum';
import { TokenService } from 'src/common/services/token/token.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private tokenService: TokenService,
  ) {}

  async register(request: RequestRegisterAdminDto) {
    try {
      const { email, password } = request;
      const admin = new Admin();
      admin.email = email;
      admin.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      admin.isAvailable = true;
      return await this.adminRepository.insert(admin);
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new HttpException(
          Message.DUPLICATE_EMAIL_ADMIN,
          HttpStatus.BAD_REQUEST,
        );
      } else { 
        throw error
      }
    }
  }

  async login(request: RequestLoginAdminDto) {
    const { email, password } = request;
    const admin = await this.adminRepository.findOneBy({ email });
    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
        if(admin.isAvailable){
          const accessToken = this.tokenService.createTokenAdmin(admin);
          const response = {
            accessToken,
            admin: {
              email: admin.email,
            },
          };
          return response;
        } else {
          throw new HttpException(
            Message.DISABLED_USER,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException(
          Message.INVALID_PASSWORD,
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(Message.INVALID_ADMIN, HttpStatus.BAD_REQUEST);
    }
  }

  async getAdmins(){
    try {
      const admins = await this.adminRepository.find()
      return admins
    } catch (error) {
      throw error
    }
  }
}
