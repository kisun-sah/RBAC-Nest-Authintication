// src/report/report.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorater';

@UseGuards(JwtGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async create(
    @GetUser('id') userId: number,
    @Body() dto: CreateReportDto,
  ) {
    return this.reportService.createReport(userId, dto);
  }

  @Get('my')
  async getMyReports(@GetUser('id') userId: number) {
    return this.reportService.getMyReports(userId);
  }
}
