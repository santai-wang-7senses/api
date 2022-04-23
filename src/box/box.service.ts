import { Injectable } from '@nestjs/common';

@Injectable()
export class BoxService {
  constructor() {}

  async getBoxList() {
    return [
      {
        name: 'Box-V1',
        version: 'BSwJT8ewCh4f5q1UMJkDnQ1QxQPVToN7wDVVzeesEjk7',
        price: 0.45,
        restNumber: 253,
      },
    ];
  }

  async getBoxVersionInfo(boxVersion: string) {
    return [
      {
        prizeToken: 'RAY',
        prizeQuantity: '5',
        prizeNumber: 2,
      },
      {
        prizeToken: 'RAY',
        prizeQuantity: '2.5',
        prizeNumber: 2,
      },
      {
        prizeToken: 'RAY',
        prizeQuantity: '0.025',
        prizeNumber: 2,
      },
    ];
  }

  async openBox(boxAddress: string, boxId: number) {
    return {
      status: 'Success',
      txId: 'isjdgfjsdfj;asdsjkf;kas;kfjgdjgfdj;',
      error: '',
    };
  }
}
