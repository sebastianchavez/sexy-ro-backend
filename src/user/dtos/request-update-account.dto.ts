import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Message } from "src/common/enums/messages.enum";

export class RequestUpdateAccountDto {

    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'password')})
    @IsNumber({}, {message: Message.IS_NUMBER_DTO.replace('{{value}}','account_id')})
    readonly account_id: number;

    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'password')})
    @IsString({message: Message.IS_STRING_DTO.replace('{{value}}', 'password')})
    @MinLength(8, {message: Message.MIN_LENGTH_DTO.replace('{{value}}', 'password').replace('{{length}}', '8')})
    readonly password: string;
    
    @IsNotEmpty({message: Message.IS_NOT_EMPTY_DTO.replace('{{value}}', 'genre')})
    @IsString({message: Message.IS_STRING_DTO.replace('{{value}}', 'genre')})
    readonly genre: string;
}