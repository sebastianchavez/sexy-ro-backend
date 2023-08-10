import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestLoginAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
