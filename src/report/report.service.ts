// src/report/report.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async createReport(userId: number, dto: CreateReportDto) {
    return await this.prisma.report.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  // Optional: Get user reports
  async getMyReports(userId: number) {
    return await this.prisma.report.findMany({
      where: { userId },
    });
  }
}
