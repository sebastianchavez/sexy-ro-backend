import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryGetAccountsDto {
  @IsNotEmpty()
  @IsNumber()
  readonly limit: number;

  @IsNotEmpty()
  @IsNumber()
  readonly page: number;
}
