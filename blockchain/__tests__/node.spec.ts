import { Transaction } from "../src/Transaction";
import { LightNode, MinerNode, FullNode } from "../src/Node";
import { Block } from "../src/Block";

describe("ut_light_node_class", () => {
  const address = "";
  const full_node_address = "";
  const public_key = "";
  const private_key = "";
  const lightnode = new LightNode(address,full_node_address,public_key,private_key);
  const transaction = new Transaction(0, "sender", "recipient", 10);
  it("is_transaction_valid", () => {
    expect(lightnode.validate_transaction(transaction)).toBe(true);
  })
  it("create_transaction", () => {
    lightnode.create_transaction(transaction);
    expect(lightnode.pending_transaction).toBe(transaction);
  })
})

describe("ut_miner_node_class", () => {
  const address = "";
  const full_node_address = "";
  const public_key = "";
  const private_key = "";
  const minernode = new MinerNode(address,full_node_address,public_key,private_key);
  const previous_block_hash = "previous_block_hash";

  it("mining:pow", () => {
    minernode.previous_block_hash = previous_block_hash;
    expect(minernode.pow().slice(0,4)).toBe("0000")
  })
})

describe("ut_full_node_class", () => {
  const address = "";
  const full_node_address = "";
  const public_key = "";
  const private_key = "";
  const fullnode = new FullNode(address, full_node_address, public_key, private_key);
  
  it("is_transaction_valid", () => {
    const transaction = new Transaction(0,"sender","recipient",10);
    const is_valid = fullnode.is_transaction_valid(transaction);
    expect(is_valid).toBe(true);
  })

  it("push_transactions", () => {
    const transaction = new Transaction(0,"sender","recipient",10);
    fullnode.push_transaction(transaction);
    fullnode.push_transaction(transaction);
    expect(fullnode.pending_transactions.length).toBe(2);
  })

  it("send_tranasactions_to_miner", () => {
    expect(fullnode.pending_transactions.length).toBe(2);
    expect(fullnode.pop_transactions()).toBe([]);
    expect(fullnode.pending_transactions.length).toBe(2);
    /**
     * then send the transactions to miner node
     */
  })

  it("is_valid_block", () => {
    const block = new Block(0,"1234",4,"maker");
    const transaction = new Transaction(0,"sender","recipient",10);
    block.add_transaction(transaction);
    block.add_transaction(transaction);
    // block from miner node
    expect(fullnode.is_valid_block(block)).toBe(true);
  })

  it("add_block", () => {
    const block = new Block(0,"1234",4,"maker");
    const transaction = new Transaction(0,"sender","recipient",10);
    block.add_transaction(transaction);
    block.add_transaction(transaction);
    // valid block from miner node
    fullnode.add_block(block);
    expect(fullnode.block_chain).toBe([block]);
  })
})