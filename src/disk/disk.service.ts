import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) {}

    getData(){
        this.powerService.supplyPower(20);
        console.log('Drqwing 20 watts of power from power service');
        return 'data!'
    }
}
