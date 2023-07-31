import { IsNotEmpty, IsString } from "class-validator";

export class RequestSaveServerDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string;
}