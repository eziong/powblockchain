export class Transaction {
  private version: number;
  private sender: string;
  private recipient: string;
  private amount: number;
  private time: number;

  constructor(version:number=0, sender:string, recipient:string, amount:number){
    this.version = version;
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.time = Date.now();
  }

  static isValid(){

  }
}