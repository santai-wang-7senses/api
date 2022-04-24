import { Injectable } from '@nestjs/common';
// import * as solanaService from './solana.service';
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
    boxInfo.ownedBoxes.push(boxId);

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

  async getOwnedBoxes(boxVersion) {
    const boxInfo = await this.readBoxInfo(boxVersion);
    return boxInfo.ownedBoxes;
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

    let prize = -1;
    boxInfo.ownedBoxes.map((element) => {
      if (element === boxId) {
        prize = boxInfo.prizeList[boxId].prize;
        boxInfo.prizeStatus.forEach((element) => {
          if (element.prize === prize) {
            element.number--;
          }
        });
      }
    });

    if (prize === -1) {
      return {
        status: `boxId ${boxId} is not yours`,
        prize: null,
      };
    }

    this.writeBoxInfo(boxVersion, boxInfo);

    return {
      status: 'Success',
      prize,
    };
  }

  async resetBoxStatus() {
    const defaultBoxInfo = {
      name: 'BOX-V1',
      totalNumber: 10,
      index: 0,
      prizeStatus: [
        {
          tokenName: 'RAY',
          prize: 5,
          number: 1,
        },
        {
          tokenName: 'RAY',
          prize: 1,
          number: 1,
        },
        {
          tokenName: 'RAY',
          prize: 0.02,
          number: 8,
        },
      ],
      prizeList: [
        {
          prize: 0.02,
        },
        {
          prize: 0.02,
        },
        {
          prize: 0.02,
        },
        {
          prize: 1,
        },
        {
          prize: 0.02,
        },
        {
          prize: 0.02,
        },
        {
          prize: 0.02,
        },
        {
          prize: 5,
        },
        {
          prize: 0.02,
        },
        {
          prize: 0.02,
        },
      ],
      ownedBoxes: [],
    };

    await this.writeBoxInfo(
      'BSwJT8ewCh4f5q1UMJkDnQ1QxQPVToN7wDVVzeesEjk7',
      defaultBoxInfo,
    );
    const defaultBoxList = [
      {
        name: 'Box-V1',
        version: 'BSwJT8ewCh4f5q1UMJkDnQ1QxQPVToN7wDVVzeesEjk7',
        price: 128,
        restNumber: 10,
      },
    ];
    await this.writeBoxList(defaultBoxList);
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

  async getOwnedList(boxVersion) {
    return JSON.parse(
      readFileSync(
        path.join(__dirname, `../../prizeConfig/${boxVersion}.json`),
      ).toString(),
    ).ownedBoxes;
  }
}
