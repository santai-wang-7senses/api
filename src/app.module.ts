import { Module } from '@nestjs/common';
// import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoxModule } from './box/box.module';
import { BoxService } from './box/box.service';

@Module({
  imports: [BoxModule],
  controllers: [AppController],
  providers: [AppService, BoxService],
})
export class AppModule {}
