import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(arg0: number) {
        return `Supplying ${arg0} watts of power`;
    }
}
