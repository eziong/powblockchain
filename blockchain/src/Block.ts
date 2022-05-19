import Transaction from "./Transaction";

const BASIC_REWARD = 100;
const REWARD_RATE = 0.02;

export default class Block {
  private _header:BlockHeader;
  private _body:BlockBody;
  private _hash:string;

  constructor(version:number, previous_block_hash:string, bits:number, maker:string, hash:string){
    this._header = new BlockHeader(version, previous_block_hash, bits);
    this._body = new BlockBody(maker);
    this._hash = hash;
  }

  set header_merklehash(merklehash:string){
    this._header.merklehash = merklehash;
  }

  set header_nonce(nonce:number){
    this._header.nonce = nonce;
  }

  set header_time(time:number){
    this._header.time = time;
  }

  set hash(hash:string){
    this._hash = hash;
  }

  add_transaction(transaction:Transaction):boolean{
    return this._body.add_pending_transaction(transaction);
  }
}

class BlockHeader {
  private _version:string;
  private _previous_block_hash:string;
  private _merklehash:string;
  private _time:number;
  private _bits:number;
  private _nonce:number;

  constructor(version, previous_block_hash, bits){
    this._version = version;
    this._previous_block_hash = previous_block_hash;
    // this.merklehash = merklehash;
    // this.time = time;
    this._bits = bits;
    // this.nonce = nonce;
  }
  set merklehash(merklehash:string){
    this._merklehash = merklehash;
  }
  set time(time:number){
    this._time = time;
  }
  set nonce(nonce:number){
    this._nonce = nonce;
  }
  calculate_merklehash():string{
    return "new merkle hash"
  }
}

class BlockBody {
  static max_transaction_count:number = 10;

  private _transactions:Transaction[];
  private _pending_transactions:Transaction[];
  private _pending_trasactions_count:number;
  private _maker:string;

  constructor(maker:string){
    this._maker = maker;
    this._transactions = [];
    this._pending_transactions = [];
    this._pending_trasactions_count = 0;
  }

  get transactions(){
    return this._transactions;
  }

  get transaction_count(){
    return this._pending_trasactions_count;
  }

  add_pending_transaction(transaction:Transaction):boolean{
    if(this._pending_trasactions_count < BlockBody.max_transaction_count){
      this._pending_transactions.push(transaction);
      this._pending_trasactions_count++;
      return true;
    }else{
      return false;
    }
  }

  push_transaction(){
    // calculate fee
    // coinbase transaction
    this._transactions = [
      new Transaction(0, "network", this._maker, 111),
      ...this._pending_transactions,
    ]
  }

  calculate_merkle_hash():string{
    return "some hash";
  }
}