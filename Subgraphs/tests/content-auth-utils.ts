import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  ContentDisputeRaised,
  ContentQueuedForVerification,
  ContentVerificationFeeUpdated,
  ContentVerificationTimelockUpdated,
  ContentVerified,
  DisputeAccepted,
  DisputeRejected,
  MinimumValidatorRequiredUpdated,
  OwnershipTransferred,
  SupportingValidatorAdded,
  Transfer,
  ValidatorAdded,
  ValidatorRemoved
} from "../generated/ContentAuth/ContentAuth"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createContentDisputeRaisedEvent(
  contentHash: Bytes,
  disputor: Address,
  disputeCid: Bytes,
  timestamp: BigInt
): ContentDisputeRaised {
  let contentDisputeRaisedEvent = changetype<ContentDisputeRaised>(
    newMockEvent()
  )

  contentDisputeRaisedEvent.parameters = new Array()

  contentDisputeRaisedEvent.parameters.push(
    new ethereum.EventParam(
      "contentHash",
      ethereum.Value.fromFixedBytes(contentHash)
    )
  )
  contentDisputeRaisedEvent.parameters.push(
    new ethereum.EventParam("disputor", ethereum.Value.fromAddress(disputor))
  )
  contentDisputeRaisedEvent.parameters.push(
    new ethereum.EventParam("disputeCid", ethereum.Value.fromBytes(disputeCid))
  )
  contentDisputeRaisedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return contentDisputeRaisedEvent
}

export function createContentQueuedForVerificationEvent(
  contentHash: Bytes,
  creator: Address,
  timestamp: BigInt,
  contentCID: Bytes
): ContentQueuedForVerification {
  let contentQueuedForVerificationEvent = changetype<
    ContentQueuedForVerification
  >(newMockEvent())

  contentQueuedForVerificationEvent.parameters = new Array()

  contentQueuedForVerificationEvent.parameters.push(
    new ethereum.EventParam(
      "contentHash",
      ethereum.Value.fromFixedBytes(contentHash)
    )
  )
  contentQueuedForVerificationEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  contentQueuedForVerificationEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  contentQueuedForVerificationEvent.parameters.push(
    new ethereum.EventParam("contentCID", ethereum.Value.fromBytes(contentCID))
  )

  return contentQueuedForVerificationEvent
}

export function createContentVerificationFeeUpdatedEvent(
  fee: BigInt,
  timestamp: BigInt
): ContentVerificationFeeUpdated {
  let contentVerificationFeeUpdatedEvent = changetype<
    ContentVerificationFeeUpdated
  >(newMockEvent())

  contentVerificationFeeUpdatedEvent.parameters = new Array()

  contentVerificationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  contentVerificationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return contentVerificationFeeUpdatedEvent
}

export function createContentVerificationTimelockUpdatedEvent(
  timelock: BigInt,
  timestamp: BigInt
): ContentVerificationTimelockUpdated {
  let contentVerificationTimelockUpdatedEvent = changetype<
    ContentVerificationTimelockUpdated
  >(newMockEvent())

  contentVerificationTimelockUpdatedEvent.parameters = new Array()

  contentVerificationTimelockUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timelock",
      ethereum.Value.fromUnsignedBigInt(timelock)
    )
  )
  contentVerificationTimelockUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return contentVerificationTimelockUpdatedEvent
}

export function createContentVerifiedEvent(
  contentHash: Bytes,
  timestamp: BigInt
): ContentVerified {
  let contentVerifiedEvent = changetype<ContentVerified>(newMockEvent())

  contentVerifiedEvent.parameters = new Array()

  contentVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "contentHash",
      ethereum.Value.fromFixedBytes(contentHash)
    )
  )
  contentVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return contentVerifiedEvent
}

export function createDisputeAcceptedEvent(
  contentHash: Bytes,
  timestamp: BigInt
): DisputeAccepted {
  let disputeAcceptedEvent = changetype<DisputeAccepted>(newMockEvent())

  disputeAcceptedEvent.parameters = new Array()

  disputeAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "contentHash",
      ethereum.Value.fromFixedBytes(contentHash)
    )
  )
  disputeAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return disputeAcceptedEvent
}

export function createDisputeRejectedEvent(
  contentHash: Bytes,
  timestamp: BigInt
): DisputeRejected {
  let disputeRejectedEvent = changetype<DisputeRejected>(newMockEvent())

  disputeRejectedEvent.parameters = new Array()

  disputeRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "contentHash",
      ethereum.Value.fromFixedBytes(contentHash)
    )
  )
  disputeRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return disputeRejectedEvent
}

export function createMinimumValidatorRequiredUpdatedEvent(
  number: BigInt,
  timestamp: BigInt
): MinimumValidatorRequiredUpdated {
  let minimumValidatorRequiredUpdatedEvent = changetype<
    MinimumValidatorRequiredUpdated
  >(newMockEvent())

  minimumValidatorRequiredUpdatedEvent.parameters = new Array()

  minimumValidatorRequiredUpdatedEvent.parameters.push(
    new ethereum.EventParam("number", ethereum.Value.fromUnsignedBigInt(number))
  )
  minimumValidatorRequiredUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return minimumValidatorRequiredUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSupportingValidatorAddedEvent(
  contentHash: Bytes,
  validator: Address,
  timestamp: BigInt
): SupportingValidatorAdded {
  let supportingValidatorAddedEvent = changetype<SupportingValidatorAdded>(
    newMockEvent()
  )

  supportingValidatorAddedEvent.parameters = new Array()

  supportingValidatorAddedEvent.parameters.push(
    new ethereum.EventParam(
      "contentHash",
      ethereum.Value.fromFixedBytes(contentHash)
    )
  )
  supportingValidatorAddedEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )
  supportingValidatorAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return supportingValidatorAddedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createValidatorAddedEvent(validator: Address): ValidatorAdded {
  let validatorAddedEvent = changetype<ValidatorAdded>(newMockEvent())

  validatorAddedEvent.parameters = new Array()

  validatorAddedEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )

  return validatorAddedEvent
}

export function createValidatorRemovedEvent(
  validator: Address
): ValidatorRemoved {
  let validatorRemovedEvent = changetype<ValidatorRemoved>(newMockEvent())

  validatorRemovedEvent.parameters = new Array()

  validatorRemovedEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )

  return validatorRemovedEvent
}
