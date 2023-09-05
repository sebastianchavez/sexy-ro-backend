import { Injectable } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';

@Injectable()
export class PvpRankingService {

    constructor(
        private cpanelService: CpanelService
    ){}

    async getPvpRanking(){
        try {
            return this.cpanelService.getPvpRanking()
        } catch (error) {
            throw error
        }
    }
}
