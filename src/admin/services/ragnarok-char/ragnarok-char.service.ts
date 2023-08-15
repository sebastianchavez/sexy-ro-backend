import { Injectable } from '@nestjs/common';
import { QueryGetCharsDto } from 'src/admin/dtos/query-get-chars.dto';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';

@Injectable()
export class RagnarokCharService {

    constructor(
        private cpanelService: CpanelService
    ) {}

    async getChars(params: QueryGetCharsDto){
        try {
            const { page, limit, email, name, ip } = params
            const query: string = `?page=${page}&limit=${limit}&name=${name}&email=${email}&ip=${ip}`
            const response = await this.cpanelService.getChars(query)
            return response
        } catch (error) {
            throw error
        }
    }
}
