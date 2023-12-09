// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ProtocolConstants extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ProtocolConstants entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ProtocolConstants must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ProtocolConstants", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): ProtocolConstants | null {
    return changetype<ProtocolConstants | null>(
      store.get_in_block("ProtocolConstants", id.toHexString())
    );
  }

  static load(id: Bytes): ProtocolConstants | null {
    return changetype<ProtocolConstants | null>(
      store.get("ProtocolConstants", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get minimumValidataorRequired(): BigInt {
    let value = this.get("minimumValidataorRequired");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set minimumValidataorRequired(value: BigInt) {
    this.set("minimumValidataorRequired", Value.fromBigInt(value));
  }

  get verificationFee(): BigInt {
    let value = this.get("verificationFee");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set verificationFee(value: BigInt) {
    this.set("verificationFee", Value.fromBigInt(value));
  }
}

export class Transaction extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Transaction must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Transaction", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Transaction | null {
    return changetype<Transaction | null>(
      store.get_in_block("Transaction", id.toHexString())
    );
  }

  static load(id: Bytes): Transaction | null {
    return changetype<Transaction | null>(
      store.get("Transaction", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromBytes(<Bytes>value));
    }
  }

  get value(): BigDecimal {
    let value = this.get("value");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set value(value: BigDecimal) {
    this.set("value", Value.fromBigDecimal(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get gasPrice(): BigDecimal {
    let value = this.get("gasPrice");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigDecimal();
    }
  }

  set gasPrice(value: BigDecimal) {
    this.set("gasPrice", Value.fromBigDecimal(value));
  }

  get input(): string {
    let value = this.get("input");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set input(value: string) {
    this.set("input", Value.fromString(value));
  }
}

export class Creator extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Creator entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Creator must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Creator", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Creator | null {
    return changetype<Creator | null>(
      store.get_in_block("Creator", id.toHexString())
    );
  }

  static load(id: Bytes): Creator | null {
    return changetype<Creator | null>(store.get("Creator", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get content(): Array<Bytes> | null {
    let value = this.get("content");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set content(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("content");
    } else {
      this.set("content", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get disputedContent(): Array<Bytes> | null {
    let value = this.get("disputedContent");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set disputedContent(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("disputedContent");
    } else {
      this.set("disputedContent", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }
}

export class Content extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Content entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Content must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Content", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Content | null {
    return changetype<Content | null>(
      store.get_in_block("Content", id.toHexString())
    );
  }

  static load(id: Bytes): Content | null {
    return changetype<Content | null>(store.get("Content", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get contentHash(): Bytes {
    let value = this.get("contentHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set contentHash(value: Bytes) {
    this.set("contentHash", Value.fromBytes(value));
  }

  get contentCid(): Bytes {
    let value = this.get("contentCid");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set contentCid(value: Bytes) {
    this.set("contentCid", Value.fromBytes(value));
  }

  get creationTimestamp(): BigInt {
    let value = this.get("creationTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set creationTimestamp(value: BigInt) {
    this.set("creationTimestamp", Value.fromBigInt(value));
  }

  get verificationTimestamp(): BigInt {
    let value = this.get("verificationTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set verificationTimestamp(value: BigInt) {
    this.set("verificationTimestamp", Value.fromBigInt(value));
  }

  get validator(): Array<Bytes> | null {
    let value = this.get("validator");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set validator(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("validator");
    } else {
      this.set("validator", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get currentDispute(): Bytes | null {
    let value = this.get("currentDispute");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set currentDispute(value: Bytes | null) {
    if (!value) {
      this.unset("currentDispute");
    } else {
      this.set("currentDispute", Value.fromBytes(<Bytes>value));
    }
  }

  get disputes(): Array<Bytes> | null {
    let value = this.get("disputes");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set disputes(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("disputes");
    } else {
      this.set("disputes", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get name(): string {
    let value = this.get("name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get dataCid(): string {
    let value = this.get("dataCid");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set dataCid(value: string) {
    this.set("dataCid", Value.fromString(value));
  }

  get socials(): Array<Bytes> | null {
    let value = this.get("socials");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set socials(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("socials");
    } else {
      this.set("socials", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get status(): string {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }
}

export class SocialLink extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SocialLink entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type SocialLink must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SocialLink", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): SocialLink | null {
    return changetype<SocialLink | null>(
      store.get_in_block("SocialLink", id.toHexString())
    );
  }

  static load(id: Bytes): SocialLink | null {
    return changetype<SocialLink | null>(
      store.get("SocialLink", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get platform(): string {
    let value = this.get("platform");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set platform(value: string) {
    this.set("platform", Value.fromString(value));
  }

  get link(): string {
    let value = this.get("link");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set link(value: string) {
    this.set("link", Value.fromString(value));
  }
}

export class Dispute extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Dispute entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Dispute must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Dispute", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Dispute | null {
    return changetype<Dispute | null>(
      store.get_in_block("Dispute", id.toHexString())
    );
  }

  static load(id: Bytes): Dispute | null {
    return changetype<Dispute | null>(store.get("Dispute", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get content(): Bytes {
    let value = this.get("content");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set content(value: Bytes) {
    this.set("content", Value.fromBytes(value));
  }

  get disputor(): Bytes {
    let value = this.get("disputor");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set disputor(value: Bytes) {
    this.set("disputor", Value.fromBytes(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get currentStatus(): string {
    let value = this.get("currentStatus");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set currentStatus(value: string) {
    this.set("currentStatus", Value.fromString(value));
  }
}

export class Validator extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Validator entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Validator must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Validator", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Validator | null {
    return changetype<Validator | null>(
      store.get_in_block("Validator", id.toHexString())
    );
  }

  static load(id: Bytes): Validator | null {
    return changetype<Validator | null>(
      store.get("Validator", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get contentVerified(): Array<Bytes> | null {
    let value = this.get("contentVerified");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set contentVerified(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("contentVerified");
    } else {
      this.set("contentVerified", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }
}