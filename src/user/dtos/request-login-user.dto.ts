import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RequestLoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}