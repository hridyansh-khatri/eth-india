import { SDKProvider } from "@metamask/sdk";
import lighthouse from "@lighthouse-web3/sdk";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  parseUnits,
  toHex,
} from "viem";
import { verifyContractAbi } from "../assets/VerifyContract";
import { scrollSepolia } from "viem/chains";

const verifyContractAddress = "0x55f7a2ff1f40e122b371ea9b6e730eff293b5b68";

const client = createPublicClient({
  chain: scrollSepolia,
  transport: http(),
});
interface ContentMetadata {
  name: string; // String Name
  type: "IMG" | "TEXT";
  contentCid: string;
  socials: Array<Object>;
}

/// Utility Function to send transaction for Function call "addContentForVerification"
export const addRequestForVerification = async (
  provider: SDKProvider,
  data: ContentMetadata,
  contentHash: string
) => {
  const signature = await sign_message_hash(provider, contentHash);
  const contentMetadataCid = await upload_content_metadata(data);

  const wallet = createWalletClient({
    transport: custom(provider),
    chain: scrollSepolia,
  });

  const { request } = await client.simulateContract({
    abi: verifyContractAbi,
    address: verifyContractAddress as `0x${string}`,
    functionName: "addContentForVerification",
    args: [
      contentHash as `0x${string}`,
      contentMetadataCid as `0x${string}`,
      signature as `0x${string}`,
    ],
    value: parseUnits("0.1", 18),
  });

  const response = await wallet.writeContract(request);
};

export const raiseDispute = async (
  provider: SDKProvider,
  disputeMetadata: any,
  contentHash: string
) => {
  const signature = await sign_message_hash(provider, contentHash);

  const disputeCid = await upload_content_metadata(disputeMetadata);

  const wallet = createWalletClient({
    transport: custom(provider),
    chain: scrollSepolia,
  });

  const { request } = await client.simulateContract({
    abi: verifyContractAbi,
    address: verifyContractAddress as `0x${string}`,
    functionName: "raiseDispute",
    args: [
      contentHash as `0x${string}`,
      disputeCid as `0x${string}`,
      toHex(signature as string),
    ],
  });

  await wallet.writeContract(request);
};

/// Utility Function to sign content hash
const sign_message_hash = async (provider: SDKProvider, contentHash: any) => {
  const signer = provider.selectedAddress;
  const signature = await window.ethereum?.request({
    method: "personal_sign",
    params: [contentHash, signer],
  });
  return signature;
};

/// Upload Content Metadata to IPFS using FileCoin or Lighthouse
const upload_content_metadata = async (
  contentMetadata: ContentMetadata
): Promise<string> => {
  const wallet = await lighthouse.uploadText();
  return "asdfads";
};
