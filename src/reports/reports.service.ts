import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.enitity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ) {}

    findOne(id: number) {
        if(id === null || id === undefined) {
            return null;
        }
        return this.repo.findOneBy({ id });
    }

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user; // Associate the report with the user
        return this.repo.save(report);
    }

    async changeApproval(id: number, approved: boolean) {
         let report = await this.findOne(id);
            if (!report) {
                throw new NotFoundException('User not found');
            }
        report.approved = approved;
        return this.repo.save(report); 
    }

}
