import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PvpRankingController } from './pvp-ranking.controller';
import { PvpRankingService } from './services/pvp-ranking/pvp-ranking.service';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { TokenService } from 'src/common/services/token/token.service';

@Module({
  controllers: [PvpRankingController],
  providers: [PvpRankingService, CpanelService, TokenService],
  imports: [HttpModule],
})
export class PvpRankingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('api/pvp-ranking/');
  }
}