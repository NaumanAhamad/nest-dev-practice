import { Controller, Post, Get, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import {AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "../users/decorators/current-user.decorators";
import { User } from '../users/user.enitity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approveReport.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportService : ReportsService) {}
    
    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        console.log('Creating a report', body);
        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    approvedReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        console.log('Approving a report', id, body.Approved);
        return this.reportService.changeApproval(parseInt(id), body.Approved);
    }

}
