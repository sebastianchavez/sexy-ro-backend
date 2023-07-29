import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/db.config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(db)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
