// src/report/dto/create-report.dto.ts
import { IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;
}
