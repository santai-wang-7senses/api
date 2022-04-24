import { Injectable } from '@nestjs/common';
import * as solanaService from './solana.service';
import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class BoxService {
  constructor() {}

  async getBoxList() {
    return await this.readBoxList();
  }

  async getBoxVersionInfo(boxVersion: string) {
    return (await this.readBoxInfo(boxVersion)).prizeStatus;
  }

  async buyBox(boxVersion: string) {
    const boxList = await this.readBoxList();

    const boxInfo = await this.readBoxInfo(boxVersion);

    if (boxInfo.index >= boxInfo.totalNumber) {
      return {
        status: 'Fail, Boxes are sold out',
        boxId: null,
      };
    }

    // Mint index NFT to user
    const boxId = boxInfo.index;

    // counter ++
    boxInfo.index++;

    // restnumber --
    boxList.forEach((element) => {
      if (element.version == boxVersion) {
        element.restNumber--;
      }
    });

    this.writeBoxInfo(boxVersion, boxInfo);
    this.writeBoxList(boxList);

    return {
      status: 'Success',
      boxId,
    };
  }

  async openBox(boxVersion: string, boxId: number) {
    // // Establish connection to the cluster
    // await solanaService.establishConnection();

    // // Determine who pays for the fees
    // await solanaService.establishPayer();

    // // Check if the program has been deployed
    // await solanaService.checkProgram();
    // return await solanaService.reportGreetings();

    const boxInfo = await this.readBoxInfo(boxVersion);

    const prize = boxInfo.prizeList[boxId].prize;
    boxInfo.prizeStatus.forEach((element) => {
      console.log(element.prize);
      console.log(prize);
      console.log(element.prize === prize);
      if (element.prize === prize) {
        element.number--;
      }
    });

    this.writeBoxInfo(boxVersion, boxInfo);

    return {
      status: 'Success',
      prize,
    };
  }

  async readBoxList() {
    return JSON.parse(
      readFileSync(
        path.join(__dirname, '../../prizeConfig/boxList.json'),
      ).toString(),
    );
  }

  async writeBoxList(boxList) {
    writeFileSync(
      path.join(__dirname, `../../prizeConfig/boxList.json`),
      JSON.stringify(boxList, null, 2),
    );
  }

  async readBoxInfo(boxVersion) {
    return JSON.parse(
      readFileSync(
        path.join(__dirname, `../../prizeConfig/${boxVersion}.json`),
      ).toString(),
    );
  }

  async writeBoxInfo(boxVersion, boxInfo) {
    writeFileSync(
      path.join(__dirname, `../../prizeConfig/${boxVersion}.json`),
      JSON.stringify(boxInfo, null, 2),
    );
  }
}
