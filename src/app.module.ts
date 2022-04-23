import { Module } from '@nestjs/common';
// import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoxModule } from './box/box.module';

@Module({
  imports: [BoxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
