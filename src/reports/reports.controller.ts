import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService : ReportsService) {}
    
    @Post()
    createReport(@Body() body: CreateReportDto) {
        return 'This action adds a new report';
    }


}
