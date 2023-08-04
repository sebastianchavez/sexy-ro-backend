import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";
import { Message } from "src/common/enums/messages.enum";

export class RequestRegisterUserDto {
    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'user')})
    @IsString({message: Message.IS_STRING_DTO.replace('{{value}}', 'user')})
    user: string;
    
    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'email')})
    @IsEmail({}, {message: Message.IS_EMAIL_DTO.replace('{{value}}', 'email')})
    email: string;
    
    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'password')})
    @IsString({message: Message.IS_STRING_DTO.replace('{{value}}', 'password')})
    @MinLength(8, {message: Message.MIN_LENGTH_DTO.replace('{{value}}', 'password').replace('{{length}}', '8')})
    password: string;
    
    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'genre')})
    @IsString({message: Message.IS_STRING_DTO.replace('{{value}}', 'genre')})
    genre: string;
}