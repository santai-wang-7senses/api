import { Controller, Get, Patch, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { BoxService } from './box/box.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly boxService: BoxService,
  ) {}

  @Get('')
  getBoxlist(): string {
    return this.appService.getHello();
  }

  @Put('reset')
  async resetBoxStatus() {
    await this.boxService.resetBoxStatus();
    return {
      status: 'Success',
    };
  }
}
