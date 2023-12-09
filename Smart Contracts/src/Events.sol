pragma solidity ^0.8.20;

library Events {
    // Events
    event ContentVerified(bytes32 indexed contentHash, uint256 timestamp);
    event ContentQueuedForVerification(
        bytes32 indexed contentHash,
        address indexed creator,
        uint256 timestamp,
        bytes contentCID
    );
    event ContentVerificationFeeUpdated(uint256 fee, uint256 timestamp);

    event ContentVerificationTimelockUpdated(
        uint256 timelock,
        uint256 timestamp
    );

    event ValidatorAdded(address validator);

    event ContentDisputeRaised(
        bytes32 indexed contentHash,
        address disputor,
        bytes disputeCid,
        uint256 timestamp
    );

    event SupportingValidatorAdded(
        bytes32 contentHash,
        address validator,
        uint256 timestamp
    );

    event ValidatorRemoved(address validator);

    event MinimumValidatorRequiredUpdated(uint256 number, uint256 timestamp);

    event DisputeAccepted(bytes32 indexed contentHash, uint256 timestamp);

    event DisputeRejected(bytes32 indexed contentHash, uint256 timestamp);

    // Enums
    enum VerificationStatus {
        UNVERIFIED,
        VERIFIED,
        DISPUTED
    }
}
