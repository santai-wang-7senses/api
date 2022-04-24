import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BoxService } from './box.service';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get('list')
  async getBoxList() {
    return await this.boxService.getBoxList();
  }

  @Get(':boxVersion/info')
  getBoxVersionInfo(@Param() params) {
    return this.boxService.getBoxVersionInfo(params.boxVersion);
  }

  @Get(':boxVersion/list')
  getOwnedBoxList(@Param() params) {
    return this.boxService.getOwnedBoxes(params.boxVersion);
  }

  @Post(':boxVersion')
  async buyBox(@Param() params) {
    return this.boxService.buyBox(params.boxVersion);
  }

  @Patch(':boxVersion/:boxId')
  openBox(
    @Param('boxVersion') boxVersion,
    @Param('boxId', ParseIntPipe) boxId,
  ) {
    return this.boxService.openBox(boxVersion, boxId);
  }
}
