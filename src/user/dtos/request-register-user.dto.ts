import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";

export class RequestRegisterUserDto {
    @IsNotEmpty()
    @IsString()
    user: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
    
    @IsNotEmpty()
    @IsString()
    genre: string;
}