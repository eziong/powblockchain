import {  Block, BlockBody, BlockHeader } from "../src/Block";
import { Transaction } from "../src/Transaction";

describe("ut_block_class", () => {
  const version = 0;
  const previous_block_hash = "1234";
  const bits = 4;
  const maker = "test_maker";
  const block = new Block(version,previous_block_hash,bits,maker);
  const transactions = [
    new Transaction(0,'test1', 'test2', 10),
    new Transaction(0,'test2', 'test3', 30),
    new Transaction(0,'test3', 'test4', 20),
    new Transaction(0,'test4', 'test5', 10),
    new Transaction(0,'test5', 'test6', 30),
    new Transaction(0,'test6', 'test7', 20),
    new Transaction(0,'test7', 'test8', 10),
    new Transaction(0,'test8', 'test9', 30),
    new Transaction(0,'test9', 'test10', 20),
    new Transaction(0,'test10', 'test11', 10),
    new Transaction(0,'test11', 'test12', 30),
    new Transaction(0,'test12', 'test13', 20),
  ]
  transactions.forEach((tx, index) => {
    it("add_pending_transaction", () => {
      expect(block.add_transaction(tx)).toBe(index < 10 ? true : false);
    })
  })
})

describe("ut_block_header_class", () => {
  const version = 0;
  const previous_block_hash = "1234";
  const bits = 4;
  const blockHeader = new BlockHeader(version,previous_block_hash,bits);
  const transactions = [
    new Transaction(0,'test1', 'test2', 10),
    new Transaction(0,'test2', 'test3', 30),
    new Transaction(0,'test3', 'test4', 20),
  ]

  it("calculate _merklehash", () => {
    expect(typeof BlockHeader.calculate_merklehash(transactions)).toBe("some_hash");
  })
})

describe("ut_block_body_class", () => {
  const maker = "test_maker";
  const blockBody = new BlockBody(maker);
  const transactions = [
    new Transaction(0,'test1', 'test2', 10),
    new Transaction(0,'test2', 'test3', 30),
    new Transaction(0,'test3', 'test4', 20),
    new Transaction(0,'test4', 'test5', 10),
    new Transaction(0,'test5', 'test6', 30),
    new Transaction(0,'test6', 'test7', 20),
    new Transaction(0,'test7', 'test8', 10),
    new Transaction(0,'test8', 'test9', 30),
    new Transaction(0,'test9', 'test10', 20),
    new Transaction(0,'test10', 'test11', 10),
    new Transaction(0,'test11', 'test12', 30),
    new Transaction(0,'test12', 'test13', 20),
  ]

  transactions.forEach((tx, index) => {
    it("add_pending_transaction", () => {
      expect(blockBody.add_pending_transaction(tx)).toBe(index < 10 ? true : false);
    })
  })
})