// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {ContentAuth} from "src/VerifyContent.sol";

contract DeployContracts is Script {
    address public deployer;
    ContentAuth public verifyContract;

    function setUp() public {
        uint256 deployerPK = uint256(vm.envBytes32("DEPLOYER_PRIVATE_KEY"));
        deployer = vm.rememberKey(deployerPK);
    }

    function run() public {
        vm.startBroadcast(deployer);
        verifyContract = new ContentAuth();
        verifyContract.changeMinimumValidatorVerification(1);
        verifyContract.addValidator(0x3aa821cEE6194C4aD7e3F3d6E393F646D1Cd65Db);
        verifyContract.addValidator(0xb009242166563ecCdbEb208a942880149C05180b);
        vm.stopBroadcast();
    }
}
