export class BoxInfo {
  boxVersion: string;
  boxId: number;
  constructor(params) {
    this.boxVersion = params.boxVersion;
    this.boxId = params.boxId;
  }
}
