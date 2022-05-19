import Block from "./Block";
import Transaction from "./Transaction";

class Node {
  public _address:string;
  private _full_node_address:string;
  private _type:string;
  private _public_key:string;
  private _private_key:string;

  constructor(address:string, full_node_address:string, type:string, public_key:string, private_key:string){
    this._address = address;
    this._full_node_address = full_node_address;
    this._type = type;
    this._public_key = public_key;
    this._private_key = private_key;
  }
}

export class LightNode extends Node{
  private _pending_transaction:Transaction;

  constructor(address:string, full_node_address:string, type:string, public_key:string, private_key:string){
    super(address,full_node_address,type,public_key,private_key);
  }

  set pending_transaction(pending_transaction:Transaction){
    this._pending_transaction = pending_transaction;
  }

  // send_transaction_to_full_node(){
  //   /**
  //    * send transaction to full node to check if it is valid
  //    */
  // }
}

export class MinerNode extends Node{
  private _previous_block_hash:string;
  private _mining_block:Block;

  constructor(address:string, full_node_address:string, type:string, public_key:string, private_key:string){
    super(address,full_node_address,type,public_key,private_key);
  }

  set previous_block_hash(previous_block_hash:string){
    this._previous_block_hash = previous_block_hash;
  }

  pow(){
    let hash = "";
    /**
     * mining to find hash
     */
    this._mining_block = new Block(0, this._previous_block_hash, 4, this._address, hash);
  }

  // send_block_to_full_node(){
  //   /**
  //    * send block to full node to check if it is valid
  //    * If it is valid, this miner node will get reward
  //    */
  // }

}

export class FullNode extends Node{
  private _block_chain:Block[];
  private _pending_transactions:Transaction[];
  private _utxo_pool:{[address:string]:number[]};

  constructor(address:string, full_node_address:string, type:string, public_key:string, private_key:string){
    super(address,full_node_address,type,public_key,private_key);
  }

  is_valid_transaction(){}

  push_transaction(){}

  pop_transactions(){} // after sending transactions to 

  is_valid_block(){} // by comparing merklehash with transactions

  add_block(){}

  // send_validation_of_transaction_to_light_node(){}

  // send_info_to_mining_node(){}

  
}