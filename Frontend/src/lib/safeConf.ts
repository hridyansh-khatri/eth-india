import {
  SafeAuthPack,
  SafeAuthConfig,
  SafeAuthInitOptions,
} from '@safe-global/auth-kit'

export const safeAuthInitOptions: SafeAuthInitOptions = {
  enableLogging: true,
  showWidgetButton: false,
  chainConfig: {
    chainId: `0x64`,
    rpcTarget: `https://gnosis.drpc.org`
  },
}

// You can also pass the SafeAuthConfig as a parameter to the SafeAuthPack constructor if you are using a custom txServiceUrl domain
// e.g. const safeAuthConfig: SafeAuthConfig = {
//   txServiceUrl: 'https://safe-transaction-mainnet.safe.global'
// }
export const safeAuthPack = new SafeAuthPack()