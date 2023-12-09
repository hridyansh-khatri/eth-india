pragma solidity 0.8.20;

import {Test} from "forge-std/Test.sol";

import {ContentAuth} from "src/VerifyContent.sol";
import {VmSafe} from "forge-std/Vm.sol";
import {Events} from "src/Events.sol";

contract TestVerifyContent is Test {
    ContentAuth private contentAuth;
    VmSafe.Wallet validator = vm.createWallet("validator");
    address private owner = makeAddr("owner");

    function setUp() public {
        vm.startPrank(owner);
        contentAuth = new ContentAuth();
        vm.label(address(contentAuth), "contentAuth");
        vm.expectEmit(false, false, false, true);
        emit Events.ValidatorAdded(validator.addr);
        contentAuth.addValidator(validator.addr);
        vm.stopPrank();
    }

    function testChangeContentVerificationFee() public {
        vm.startPrank(owner);
        vm.expectEmit(false, false, false, true);
        emit Events.ContentVerificationFeeUpdated(0.1 ether, block.timestamp);
        contentAuth.changeContentVerificationFee(0.1 ether);
        assertEq(contentAuth.contentVerificationFee(), 0.1 ether);
        vm.stopPrank();
    }

    function testChangeValidator() public {
        address testValidator = makeAddr("testValidator");
        vm.startPrank(owner);
        vm.expectEmit(false, false, false, true);
        emit Events.ValidatorAdded(testValidator);
        contentAuth.addValidator(testValidator);
        assertTrue(contentAuth.validatorSet(testValidator));
        vm.stopPrank();
    }

    function testChangeMinimumValidatorRequired() public {
        vm.startPrank(owner);
        vm.expectEmit(false, false, false, true);
        emit Events.MinimumValidatorRequiredUpdated(2, block.timestamp);
        contentAuth.changeMinimumValidatorVerification(2);
        assertEq(contentAuth.minimumValidatorSignatureRequired(), 2);
        vm.stopPrank();
    }

    function testQueueVerifyContent() public {
        (address creator, uint256 creatorPK) = makeAddrAndKey("creator");
        vm.deal(creator, 1 ether);
        bytes32 contentHash = keccak256("Content Hash");
        bytes memory contentCid = "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks";
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(creatorPK, contentHash);
        bytes memory signature = abi.encodePacked(r, s, v);
        vm.startPrank(creator);
        vm.expectEmit(false, false, false, true);
        emit Events.ContentQueuedForVerification(
            contentHash,
            creator,
            block.timestamp,
            contentCid
        );
        contentAuth.addContentForVerification{value: 0.1 ether}(
            contentHash,
            contentCid,
            signature
        );
        assertEq(address(contentAuth).balance, 0.1 ether);
        vm.stopPrank();
    }

    function testVerifyContentUsingValidator() public {
        (address creator, uint256 creatorPK) = makeAddrAndKey("creator");
        vm.deal(creator, 1 ether);
        bytes32 contentHash = keccak256("Content Hash");
        bytes memory contentCid = "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks";
        (uint8 v_c, bytes32 r_c, bytes32 s_c) = vm.sign(creatorPK, contentHash);
        bytes memory signature = abi.encodePacked(r_c, s_c, v_c);
        vm.startPrank(creator);
        vm.expectEmit(false, false, false, true);
        emit Events.ContentQueuedForVerification(
            contentHash,
            creator,
            block.timestamp,
            contentCid
        );
        contentAuth.addContentForVerification{value: 0.1 ether}(
            contentHash,
            contentCid,
            signature
        );
        assertEq(address(contentAuth).balance, 0.1 ether);
        vm.stopPrank();
        vm.startPrank(validator.addr);
        (uint8 v_v, bytes32 r_v, bytes32 s_v) = vm.sign(validator, contentHash);
        bytes memory validatorSignature = abi.encodePacked(r_v, s_v, v_v);
        vm.expectEmit(false, false, false, true);
        emit Events.SupportingValidatorAdded(
            contentHash,
            validator.addr,
            block.timestamp
        );
        contentAuth.verifyContent(contentHash, validatorSignature);
        vm.stopPrank();
    }

    function testRaiseDispute() public {
        (address creator, uint256 creatorPK) = makeAddrAndKey("creator");
        vm.deal(creator, 1 ether);
        bytes32 contentHash = keccak256("Content Hash");
        (uint8 v_c, bytes32 r_c, bytes32 s_c) = vm.sign(creatorPK, contentHash);
        bytes memory signature = abi.encodePacked(r_c, s_c, v_c);
        vm.startPrank(creator);
        vm.expectEmit(false, false, false, true);
        emit Events.ContentQueuedForVerification(
            contentHash,
            creator,
            block.timestamp,
            "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks"
        );
        contentAuth.addContentForVerification{value: 0.1 ether}(
            contentHash,
            "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks",
            signature
        );
        vm.startPrank(owner);
        contentAuth.changeMinimumValidatorVerification(1);
        vm.stopPrank();
        vm.startPrank(validator.addr);
        (uint8 v_v, bytes32 r_v, bytes32 s_v) = vm.sign(validator, contentHash);
        bytes memory validatorSignature = abi.encodePacked(r_v, s_v, v_v);
        vm.expectEmit(false, false, false, true);
        emit Events.SupportingValidatorAdded(
            contentHash,
            validator.addr,
            block.timestamp
        );
        contentAuth.verifyContent(contentHash, validatorSignature);
        ContentAuth.VerificationStatus status = contentAuth
            .getContentVerificationStatus(contentHash);
        // assertEq(status, ContentAuth.VerificationStatus.VERIFIED);

        (address disputor, uint256 disputorPK) = makeAddrAndKey("disputor");
        vm.startPrank(disputor);
        vm.deal(disputor, 1 ether);
        (uint8 v_d, bytes32 r_d, bytes32 s_d) = vm.sign(
            disputorPK,
            contentHash
        );
        bytes memory disputorSignature = abi.encodePacked(r_d, s_d, v_d);
        bytes memory disputeCid = "DISPUTE CID";
        contentAuth.raiseDispute{value: 0.1 ether}(
            contentHash,
            disputeCid,
            disputorSignature
        );
        ContentAuth.VerificationStatus disputedContent = contentAuth
            .getContentVerificationStatus(contentHash);
        // assertEq(disputedContent, Events.VerificationStatus.DISPUTED);
        vm.stopPrank();
    }

    function testDisputeAccepted() public {
        (address creator, uint256 creatorPK) = makeAddrAndKey("creator");
        vm.deal(creator, 1 ether);
        bytes32 contentHash = keccak256("Content Hash");
        (uint8 v_c, bytes32 r_c, bytes32 s_c) = vm.sign(creatorPK, contentHash);
        bytes memory signature = abi.encodePacked(r_c, s_c, v_c);
        vm.startPrank(creator);
        vm.expectEmit(false, false, false, true);
        emit Events.ContentQueuedForVerification(
            contentHash,
            creator,
            block.timestamp,
            "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks"
        );
        contentAuth.addContentForVerification{value: 0.1 ether}(
            contentHash,
            "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks",
            signature
        );
        vm.startPrank(owner);
        contentAuth.changeMinimumValidatorVerification(1);
        vm.stopPrank();
        vm.startPrank(validator.addr);
        (uint8 v_v, bytes32 r_v, bytes32 s_v) = vm.sign(validator, contentHash);
        bytes memory validatorSignature = abi.encodePacked(r_v, s_v, v_v);
        vm.expectEmit(false, false, false, true);
        emit Events.SupportingValidatorAdded(
            contentHash,
            validator.addr,
            block.timestamp
        );
        contentAuth.verifyContent(contentHash, validatorSignature);
        ContentAuth.VerificationStatus status = contentAuth
            .getContentVerificationStatus(contentHash);
        // assertEq(status, ContentAuth.VerificationStatus.VERIFIED);

        (address disputor, uint256 disputorPK) = makeAddrAndKey("disputor");
        vm.startPrank(disputor);
        vm.deal(disputor, 1 ether);
        (uint8 v_d, bytes32 r_d, bytes32 s_d) = vm.sign(
            disputorPK,
            contentHash
        );
        bytes memory disputorSignature = abi.encodePacked(r_d, s_d, v_d);
        bytes memory disputeCid = "DISPUTE CID";
        vm.expectEmit(false, false, false, true);
        emit Events.ContentDisputeRaised(
            contentHash,
            disputor,
            disputeCid,
            block.timestamp
        );
        contentAuth.raiseDispute{value: 0.1 ether}(
            contentHash,
            disputeCid,
            disputorSignature
        );
        ContentAuth.VerificationStatus disputedContent = contentAuth
            .getContentVerificationStatus(contentHash);
        // assertEq(disputedContent, Events.VerificationStatus.DISPUTED);
        vm.stopPrank();

        vm.startPrank(validator.addr);

        bytes[] memory validatorSignatures = new bytes[](1);
        validatorSignatures[0] = validatorSignature;

        address[] memory validatorAddress = new address[](1);
        validatorAddress[0] = validator.addr;

        contentAuth.resolveDispute(
            contentHash,
            true,
            validatorAddress,
            validatorSignatures
        );

        contentAuth.getContentVerificationStatus(contentHash);
        contentAuth.getContentInfo(contentHash);

        vm.stopPrank();
    }

    function testDisputeRejected() public {
        (address creator, uint256 creatorPK) = makeAddrAndKey("creator");
        vm.deal(creator, 1 ether);
        bytes32 contentHash = keccak256("Content Hash");
        (uint8 v_c, bytes32 r_c, bytes32 s_c) = vm.sign(creatorPK, contentHash);
        bytes memory signature = abi.encodePacked(r_c, s_c, v_c);
        vm.startPrank(creator);
        vm.expectEmit(false, false, false, true);
        emit Events.ContentQueuedForVerification(
            contentHash,
            creator,
            block.timestamp,
            "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks"
        );
        contentAuth.addContentForVerification{value: 0.1 ether}(
            contentHash,
            "9YUCAal7nfhoUlvASgiMSZ8BPuQuDI6YhEj2Hp_Z4ks",
            signature
        );
        vm.startPrank(owner);
        contentAuth.changeMinimumValidatorVerification(1);
        vm.stopPrank();
        vm.startPrank(validator.addr);
        (uint8 v_v, bytes32 r_v, bytes32 s_v) = vm.sign(validator, contentHash);
        bytes memory validatorSignature = abi.encodePacked(r_v, s_v, v_v);
        vm.expectEmit(false, false, false, true);
        emit Events.SupportingValidatorAdded(
            contentHash,
            validator.addr,
            block.timestamp
        );
        contentAuth.verifyContent(contentHash, validatorSignature);
        ContentAuth.VerificationStatus status = contentAuth
            .getContentVerificationStatus(contentHash);
        // assertEq(status, ContentAuth.VerificationStatus.VERIFIED);

        (address disputor, uint256 disputorPK) = makeAddrAndKey("disputor");
        vm.startPrank(disputor);
        vm.deal(disputor, 1 ether);
        (uint8 v_d, bytes32 r_d, bytes32 s_d) = vm.sign(
            disputorPK,
            contentHash
        );
        bytes memory disputorSignature = abi.encodePacked(r_d, s_d, v_d);
        bytes memory disputeCid = "DISPUTE CID";
        vm.expectEmit(false, false, false, true);
        emit Events.ContentDisputeRaised(
            contentHash,
            disputor,
            disputeCid,
            block.timestamp
        );
        contentAuth.raiseDispute{value: 0.1 ether}(
            contentHash,
            disputeCid,
            disputorSignature
        );
        ContentAuth.VerificationStatus disputedContent = contentAuth
            .getContentVerificationStatus(contentHash);
        // assertEq(disputedContent, Events.VerificationStatus.DISPUTED);
        vm.stopPrank();

        vm.startPrank(validator.addr);

        bytes[] memory validatorSignatures = new bytes[](1);
        validatorSignatures[0] = validatorSignature;

        address[] memory validatorAddress = new address[](1);
        validatorAddress[0] = validator.addr;

        contentAuth.resolveDispute(
            contentHash,
            false,
            validatorAddress,
            validatorSignatures
        );

        contentAuth.getContentVerificationStatus(contentHash);
        contentAuth.getContentInfo(contentHash);

        vm.stopPrank();
    }
}
