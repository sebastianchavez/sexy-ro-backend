import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IRequestRegisterLogin } from '../../interfaces/request-register-login.interface';
import { IRequestUpdateLogin } from 'src/common/interfaces/request-update-login.interface';

@Injectable()
export class CpanelService {
  private urlCpanel: string = process.env.URL_CPANEL;

  constructor(private http: HttpService) {}

  async registerLogin(request: IRequestRegisterLogin) {
    try {
      const url = `${this.urlCpanel}api/login/register`;
      const response = await firstValueFrom(this.http.post(url, request));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getLogin(email: string, user: string) {
    try {
      const url = `${this.urlCpanel}api/login/get-login?email=${email}&user=${user}`;
      const response = await firstValueFrom(this.http.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getLogins(query: string) {
    try {
      const url = `${this.urlCpanel}api/login/get-logins${query}`;
      const response = await firstValueFrom(this.http.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateLogin(request: IRequestUpdateLogin) {
    try {
      const url = `${this.urlCpanel}api/login/update-login`;
      const response = await firstValueFrom(this.http.put(url, request));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getChars(query: string){
    try {
      const url = `${this.urlCpanel}api/char/get-chars${query}`;
      const response = await firstValueFrom(this.http.get(url));
      return response.data;
    } catch (error) {
      throw error
    }
  }

  async getPvpRanking(){
    try {
      const url = `${this.urlCpanel}api/pvp-ranking/get-ranking`;
      const response = await lastValueFrom(this.http.get(url));
      return response.data;
    } catch (error) {
      throw error
    }
  }
}
