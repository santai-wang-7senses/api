import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxInfo } from './dto/box.dto';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get('list')
  getBoxList() {
    return this.boxService.getBoxList();
  }

  @Get(':boxVersion')
  getBoxVersionInfo(@Param() params) {
    return this.boxService.getBoxVersionInfo(params.boxVersion);
  }

  @Patch(':boxVersion/:boxId')
  openBox(@Param('boxId', ParseIntPipe) params) {
    return this.boxService.openBox(params.boxVersion, params.boxId);
  }
}
