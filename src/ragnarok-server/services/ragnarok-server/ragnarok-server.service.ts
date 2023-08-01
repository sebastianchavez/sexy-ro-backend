import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestSaveServerDto } from 'src/ragnarok-server/dtos/request-save-server.dto';
import { RagnarokServer } from 'src/ragnarok-server/entities/ragnarokserver.entity';
import { Repository } from 'typeorm'

@Injectable()
export class RagnarokServerService {

    constructor(
        @InjectRepository(RagnarokServer)
        private ragnarokServerRepository: Repository<RagnarokServer>,
    ){}

    saveServer(request: RequestSaveServerDto){
        const { name, description} = request
        const newServer = new RagnarokServer()
        newServer.name = name
        newServer.description = description
        return this.ragnarokServerRepository.insert(newServer)
    }

    findServerById(id: number){
        return this.ragnarokServerRepository.findOneBy({idServer: id})
    }
}
