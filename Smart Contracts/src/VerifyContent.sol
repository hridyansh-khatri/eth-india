// SPDX-License-Identifier MIT
pragma solidity 0.8.20;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {SignatureChecker} from "../lib/openzeppelin-contracts/contracts/utils/cryptography/SignatureChecker.sol";

contract ContentAuth is ERC721, Ownable {
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

    // Structs
    struct ContentInfo {
        bytes32 contentHash;
        address creator;
        address disputorAddress;
        address[] supportingValidator;
        VerificationStatus status;
    }

    uint256 public contentVerificationFee = 0.01 ether;
    uint256 public contentVerificationTimelock = 24 hours;
    uint256 public minimumValidatorSignatureRequired = 3;

    // Mappings
    mapping(bytes32 => ContentInfo) public contentInfo;
    mapping(address => bool) public validatorSet;

    // Constructor
    constructor() ERC721("ContentAuth", "CAT") Ownable(msg.sender) {}

    /// Function to change Content Verification Fee
    function changeContentVerificationFee(uint256 newFee) external onlyOwner {
        contentVerificationFee = newFee;
        emit ContentVerificationFeeUpdated(
            contentVerificationFee,
            block.timestamp
        );
    }

    // Function to change verification timelock
    function changeContentVerificationTimelock(
        uint256 newTimelock
    ) external onlyOwner {
        contentVerificationTimelock = newTimelock;
        emit ContentVerificationTimelockUpdated(
            contentVerificationTimelock,
            block.timestamp
        );
    }

    /// Change Minimum Validator Verification Required
    function changeMinimumValidatorVerification(
        uint256 validatatorRequired
    ) external onlyOwner {
        minimumValidatorSignatureRequired = validatatorRequired;
        emit MinimumValidatorRequiredUpdated(
            minimumValidatorSignatureRequired,
            block.timestamp
        );
    }

    /// Function to add Validator
    function addValidator(address validator) external onlyOwner {
        require(validator != address(0), "Invalid Validator Address");
        validatorSet[validator] = true;
        emit ValidatorAdded(validator);
    }

    // Function to remove Validator
    function removeValidator(address validator) external onlyOwner {
        require(validatorSet[validator], "No Such Validator");
        validatorSet[validator] = false;
        emit ValidatorRemoved(validator);
    }

    /// Function to submit content for Verification
    function addContentForVerification(
        bytes32 contentHash,
        bytes calldata contentCid,
        bytes memory signature
    ) public payable {
        require(
            contentInfo[contentHash].creator == address(0),
            "Content Already Claimed, Please Raise Dispute"
        );

        require(
            msg.value >= contentVerificationFee,
            "Content Verification Fee Missing"
        );

        require(
            SignatureChecker.isValidSignatureNow(
                msg.sender,
                contentHash,
                signature
            ),
            "Invalid Signature Provided"
        );

        contentInfo[contentHash] = ContentInfo(
            contentHash,
            msg.sender,
            address(0),
            new address[](0),
            VerificationStatus.UNVERIFIED
        );

        emit ContentQueuedForVerification(
            contentHash,
            msg.sender,
            block.timestamp,
            contentCid
        );
    }

    /// Verify Content Verification Request
    function verifyContent(bytes32 contentHash, bytes memory signature) public {
        require(validatorSet[msg.sender], "Not a validataor");
        require(
            SignatureChecker.isValidSignatureNow(
                msg.sender,
                contentHash,
                signature
            ),
            "Invalid Signature Provided"
        );

        ContentInfo storage content = contentInfo[contentHash];
        content.supportingValidator.push(msg.sender);

        emit SupportingValidatorAdded(contentHash, msg.sender, block.timestamp);

        if (
            content.supportingValidator.length >=
            minimumValidatorSignatureRequired
        ) {
            content.status = VerificationStatus.VERIFIED;

            _mint(content.creator, uint256(contentHash));
            emit ContentVerified(contentHash, block.timestamp);
        }
    }

    /// Function to raise disupte
    function raiseDispute(
        bytes32 contentHash,
        bytes memory disputeCid,
        bytes memory signature
    ) public payable {
        require(
            contentInfo[contentHash].creator != address(0),
            "No Such Content Exists"
        );

        require(
            SignatureChecker.isValidSignatureNow(
                msg.sender,
                contentHash,
                signature
            ),
            "Invalid Signature Provided"
        );

        require(
            contentInfo[contentHash].status != VerificationStatus.DISPUTED ||
                contentInfo[contentHash].status !=
                VerificationStatus.UNVERIFIED,
            "Content Status not Verified"
        );
        require(
            msg.value >= contentVerificationFee,
            "Content Verificatoin Fee Missing"
        );

        contentInfo[contentHash].status = VerificationStatus.DISPUTED;
        contentInfo[contentHash].disputorAddress = msg.sender;

        emit ContentDisputeRaised(
            contentHash,
            msg.sender,
            disputeCid,
            block.timestamp
        );
    }

    /// Function to resolve dispute
    function resolveDispute(
        bytes32 contentHash,
        bool isDisputeAccepted,
        address[] calldata validator,
        bytes[] memory signatures
    ) public {
        require(
            validator.length == signatures.length,
            "Validator Signature Mismatch"
        );
        require(
            validator.length >= minimumValidatorSignatureRequired,
            "Validator Number Missing"
        );
        require(
            contentInfo[contentHash].status == VerificationStatus.DISPUTED,
            "Content Not Disputed"
        );
        for (uint256 i = 0; i < validator.length; i++) {
            require(
                SignatureChecker.isValidSignatureNow(
                    validator[i],
                    contentHash,
                    signatures[i]
                ),
                "Invalid Signature Provided"
            );
        }
        if (isDisputeAccepted) {
            _transfer(
                contentInfo[contentHash].creator,
                contentInfo[contentHash].disputorAddress,
                uint256(contentHash)
            );
            contentInfo[contentHash].creator = contentInfo[contentHash]
                .disputorAddress;
            contentInfo[contentHash].disputorAddress = address(0);
            contentInfo[contentHash].status = VerificationStatus.VERIFIED;

            emit DisputeAccepted(contentHash, block.timestamp);
        } else {
            contentInfo[contentHash].disputorAddress = address(0);
            contentInfo[contentHash].status = VerificationStatus.VERIFIED;

            emit DisputeRejected(contentHash, block.timestamp);
        }
    }

    function getContentInfo(
        bytes32 contentHash
    ) public view returns (ContentInfo memory) {
        return contentInfo[contentHash];
    }

    // Function for users to check content verification status
    function getContentVerificationStatus(
        bytes32 contentHash
    ) public view returns (VerificationStatus) {
        return contentInfo[contentHash].status;
    }
}
