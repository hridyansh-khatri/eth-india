import { BigInt, Bytes, log, store } from "@graphprotocol/graph-ts";
import {
  ContentDisputeRaised as ContentDisputeRaisedEvent,
  ContentQueuedForVerification as ContentQueuedForVerificationEvent,
  ContentVerificationFeeUpdated as ContentVerificationFeeUpdatedEvent,
  ContentVerified as ContentVerifiedEvent,
  DisputeAccepted as DisputeAcceptedEvent,
  DisputeRejected as DisputeRejectedEvent,
  MinimumValidatorRequiredUpdated as MinimumValidatorRequiredUpdatedEvent,
  SupportingValidatorAdded as SupportingValidatorAddedEvent,
  ValidatorAdded as ValidatorAddedEvent,
  ValidatorRemoved as ValidatorRemovedEvent,
} from "../generated/ContentAuth/ContentAuth";
import {
  Content,
  Dispute,
  ProtocolConstants,
  Validator,
} from "../generated/schema";
import { ensureTransaction } from "./utils/transaction";
import { formatIPFS } from "./utils/ipfs";

const PROTOCOL_STATS_ID = Bytes.fromI32(69240);

export function handleValidatorAdded(event: ValidatorAddedEvent): void {
  let validator = new Validator(event.params.validator);
  validator.transaction = ensureTransaction(event).id;
  validator.save();
}

export function handleValidatorRemoved(event: ValidatorRemovedEvent): void {
  store.remove("Validator", event.params.validator.toHexString());
}

export function handleContentVerificationRequestQueued(
  event: ContentQueuedForVerificationEvent
): void {
  let content = new Content(event.params.contentHash);

  content.transaction = ensureTransaction(event).id;
  content.contentHash = event.params.contentHash;
  content.creator = event.params.creator;
  content.contentCid = event.params.contentCID;
  content.creationTimestamp = event.params.timestamp;
  content.status = "PENDING_VERIFICATION";
  formatIPFS(content);

  content.save();
}

export function handleSupportingValidatorAdded(
  event: SupportingValidatorAddedEvent
): void {
  let content = Content.load(event.params.contentHash);

  if (!content) log.critical("Content Missing", []);
  else {
    let validators = content.validator;
    if (validators) validators.push(event.params.validator);
    else validators = [event.params.validator];
    content.validator = validators;
    content.save();
  }
}

export function handleMinimumValidatorRequiredUpdated(
  event: MinimumValidatorRequiredUpdatedEvent
): void {
  let protocolStats = ProtocolConstants.load(PROTOCOL_STATS_ID);

  if (!protocolStats) {
    protocolStats = new ProtocolConstants(PROTOCOL_STATS_ID);
    protocolStats.verificationFee = BigInt.fromI32(0);
  }
  protocolStats.minimumValidataorRequired = event.params.number;

  protocolStats.save();
}

export function handleContentVerificationFeeUpdated(
  event: ContentVerificationFeeUpdatedEvent
): void {
  let protocolStats = ProtocolConstants.load(PROTOCOL_STATS_ID);

  if (!protocolStats) {
    protocolStats = new ProtocolConstants(PROTOCOL_STATS_ID);
    protocolStats.minimumValidataorRequired = BigInt.fromI32(0);
  }

  protocolStats.verificationFee = event.params.fee;

  protocolStats.save();
}

export function handleContentDisputeRaised(
  event: ContentDisputeRaisedEvent
): void {
  let content = Content.load(event.params.contentHash);

  if (!content) log.critical("Content Entity Missing", []);
  else {
    content.status = "DISPUTED";
    let transaction = ensureTransaction(event);
    let dispute = new Dispute(transaction.id);
    dispute.creator = content.creator;
    dispute.content = content.contentHash;
    dispute.currentStatus = "UNDER_REVIEW";
    dispute.disputor = event.params.disputor;
    dispute.transaction = transaction.id;
    dispute.save();

    content.currentDispute = dispute.id;

    content.save();
  }
}

export function hanldeContentVerifiedEvent(event: ContentVerifiedEvent): void {
  let content = Content.load(event.params.contentHash);

  if (!content) log.critical("Content Entity Missing", []);
  else {
    content.status = "VERIFIED";
    content.verificationTimestamp = event.params.timestamp;
    content.save();
  }
}

export function handleDisputeAcceptedEvent(event: DisputeAcceptedEvent): void {
  let content = Content.load(event.params.contentHash);
  if (!content) log.critical("Content Entity Missing", []);
  else {
    let dispute = content.currentDispute;
    if (dispute) {
      let disputeEntity = Dispute.load(dispute);
      if (disputeEntity) {
        disputeEntity.currentStatus = "ACCEPTED";
        content.creator = disputeEntity.disputor;
        content.unset("currentDispute");
        content.save();
        disputeEntity.save();
      }
    } else {
      log.critical("Dispute Entity Missing", []);
      throw ERROR("DISPUTE EVENT MISSING");
    }
  }
}

export function handleDisputeRejectedEvent(event: DisputeRejectedEvent): void {
  let content = Content.load(event.params.contentHash);
  if (!content) log.critical("Content Entity Missing", []);
  else {
    let dispute = content.currentDispute;
    if (dispute) {
      let disputeEntity = Dispute.load(dispute);
      if (disputeEntity) {
        disputeEntity.currentStatus = "REJECTED";
        content.unset("currentDispute");
        content.save();
        disputeEntity.save();
      }
    } else {
      log.critical("Dispute Entity Missing", []);
      throw ERROR("DISPUTE EVENT MISSING");
    }
  }
}
