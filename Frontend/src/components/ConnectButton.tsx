'use client'

import { useSDK } from "@metamask/sdk-react";
import { Button } from "./ui/Button";
import { useSafeAuthStore } from "@/store/safeAuthStore";
import { safeAuthInitOptions, safeAuthPack } from "@/lib/safeConf";

const ConnectButton = () => {
  const { sdk, connected, connecting, account } = useSDK();
  const {safeAuthPack: authPack} = useSafeAuthStore();
  const { setSafeAuthPack, setProvider } = useSafeAuthStore();
  return <>
  {account && <div className="text-black">{account}</div>}
  <Button onClick={() => {
    if (!connected) {
      sdk?.connect().catch(console.log)
    }else {
      sdk?.disconnect();
    }
  }}>{connected ? 'Disconnect' : connecting ? 'Connecting' : 'Connect'}</Button>
  <Button onClick={async ()=>{
    await safeAuthPack.init(safeAuthInitOptions);
    setSafeAuthPack(safeAuthPack);
    await safeAuthPack.signIn()
  }}>
    Safe SDK Connect
  </Button>
  </>
}
export default ConnectButton;