import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryGetEventsDto {
    @IsNumber()
    @IsNotEmpty()
    readonly limit: number;

    @IsNumber()
    @IsNotEmpty()
    readonly page: number;

    @IsString()
    @IsOptional()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly type: string;

    @IsNumber()
    @IsNotEmpty()
    readonly idServer: number
}