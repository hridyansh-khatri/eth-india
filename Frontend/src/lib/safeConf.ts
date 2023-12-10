import {
  SafeAuthPack,
  SafeAuthConfig,
  SafeAuthInitOptions,
} from "@safe-global/auth-kit";

// export const safeAuthInitOptions: SafeAuthInitOptions = {
//   enableLogging: true,
//   showWidgetButton: false,
//   chainConfig: {
//     chainId: `0x64`,
//     rpcTarget: `https://gnosis.drpc.org`,
//   },
// };

// You can also pass the SafeAuthConfig as a parameter to the SafeAuthPack constructor if you are using a custom txServiceUrl domain
// e.g. const safeAuthConfig: SafeAuthConfig = {
//   txServiceUrl: 'https://safe-transaction-mainnet.safe.global'
// }
export const safeAuthInitOptions: SafeAuthInitOptions = {
  showWidgetButton: false, // Set to true to show the SafeAuth widget button
  chainConfig: {
    blockExplorerUrl: "https://etherscan.io", // The block explorer URL
    chainId: "0x5", // The chain ID
    displayName: "Ethereum Goerli", // The chain name
    rpcTarget: "https://rpc.ankr.com/eth_goerli", // The RPC target
    ticker: "ETH", // The chain ticker
    tickerName: "Ethereum", // The chain ticker name
  },
};
const init = (callback: (authPack: SafeAuthPack) => void) => {
  const safeAuthPack = new SafeAuthPack();
  safeAuthPack.init(safeAuthInitOptions).then(() => {
    console.log("safeAuthPack initialized");
    callback(safeAuthPack);
  });
};
export { init };
