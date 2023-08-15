import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestSaveEventDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly type: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly days: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly startHour: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly endHour: number;
}