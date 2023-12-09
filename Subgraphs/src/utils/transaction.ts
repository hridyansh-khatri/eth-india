import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Transaction } from "../../generated/schema";

export function ensureTransaction(event: ethereum.Event): Transaction {
  let id = event.transaction.hash;
  let transaction = Transaction.load(id);
  if (transaction) {
    return transaction;
  }

  transaction = new Transaction(id);
  transaction.from = event.transaction.from;
  transaction.to = event.transaction.to ? event.transaction.to : null;
  transaction.value = toBigDecimal(event.transaction.value);
  transaction.block = event.block.number;
  transaction.timestamp = event.block.timestamp;
  //transaction.gasUsed = event.transaction.gasUsed.toI32();
  transaction.gasPrice = toBigDecimal(event.transaction.gasPrice);
  transaction.input = event.transaction.input.toHex();
  transaction.blockHash = event.block.hash;
  transaction.save();

  return transaction;
}

export function toBigDecimal(quantity: BigInt, decimals: i32 = 18): BigDecimal {
  return quantity.divDecimal(
    BigInt.fromI32(10)
      .pow(decimals as u8)
      .toBigDecimal()
  );
}
