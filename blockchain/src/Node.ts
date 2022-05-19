import { Block, BlockBody } from "./Block";
import { Transaction } from "./Transaction";

class Node {
  public _address:string;
  private _full_node_address:string;
  private _public_key:string;
  private _private_key:string;

  constructor(address:string, full_node_address:string, public_key:string, private_key:string){
    this._address = address;
    this._full_node_address = full_node_address;
    this._public_key = public_key;
    this._private_key = private_key;
  }
}

export class LightNode extends Node{
  private _pending_transaction:Transaction;

  constructor(address:string, full_node_address:string, public_key:string, private_key:string){
    super(address,full_node_address,public_key,private_key);
  }

  get pending_transaction(){
    return this._pending_transaction;
  }

  validate_transaction(transaction:Transaction):boolean{
    /**
     * check if the transaction is valid
     */
    return true;
  }

  create_transaction(transaction:Transaction){
    this._pending_transaction = transaction;
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

  constructor(address:string, full_node_address:string, public_key:string, private_key:string){
    super(address,full_node_address,public_key,private_key);
  }

  set previous_block_hash(previous_block_hash:string){
    this._previous_block_hash = previous_block_hash;
  }

  pow():string{
    let hash = "0000fgd43rgsgsrg";
    /**
     * mining to find hash
     */
    this._mining_block = new Block(0, this._previous_block_hash, 4, this._address);
    return hash;
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

  constructor(address:string, full_node_address:string, public_key:string, private_key:string){
    super(address,full_node_address,public_key,private_key);
    this._block_chain = [ new Block(0,"genesis_block", 4, "network") ];
    this._pending_transactions = [];
    this._utxo_pool = {};
  }

  get pending_transactions() {
    return this._pending_transactions;
  }

  get block_chain() {
    return this._block_chain;
  }

  is_transaction_valid(transaction:Transaction){
    /**
     * check transaction itself
     * check transaction with utxo_pool
     */
    return true;
  }

  push_transaction(transaction:Transaction){}

  pop_transactions():Transaction[]{
    /**
     * pop maximum max_transaction_count transactions
     */
    const pop_transactions = this._pending_transactions.slice(0,BlockBody.max_transaction_count);
    const left_transactions = this._pending_transactions.slice(BlockBody.max_transaction_count);
    this._pending_transactions = left_transactions;
    return pop_transactions;
  } // after sending transactions to 

  is_valid_block(block:Block):boolean{
    return true;
  } // by comparing merklehash with transactions

  add_block(block:Block){
    this._block_chain.push(block);
  }

  // send_validation_of_transaction_to_light_node(){}

  // send_info_to_mining_node(){}

  
}