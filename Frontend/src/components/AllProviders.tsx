"use client";
import React, { useEffect, useState } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { CHAIN_ID } from "@/lib/constants";
import { safeAuthInitOptions, safeAuthPack } from "@/lib/safeConf";
import {
  usePersistSafeAuthStore,
  useSafeAuthStore,
} from "@/store/safeAuthStore";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [renderd, setRendered] = useState<boolean>(false);
  const {
    isAuthenticated,
    setUserInfo,
    setIsAuthenticated,
    setSafeAuthSignInResponse,
  } = usePersistSafeAuthStore();
  const { setSafeAuthPack, setProvider } = useSafeAuthStore();
  useEffect(() => {
    setRendered(true);
    (async () => {
      await safeAuthPack.init(safeAuthInitOptions);
      setSafeAuthPack(safeAuthPack);
      safeAuthPack.subscribe("accountsChanged", async (accounts) => {
        console.log(
          "safeAuthPack:accountsChanged",
          accounts,
          safeAuthPack.isAuthenticated
        );
        if (safeAuthPack.isAuthenticated) {
          const signInInfo = await safeAuthPack?.signIn();

          setSafeAuthSignInResponse(signInInfo);
          setIsAuthenticated(true);
        }
      });
    })();
  }, []);
  useEffect(() => {
    if (!safeAuthPack || !isAuthenticated) return;
    (async () => {
      const web3Provider = safeAuthPack.getProvider();
      const userInfo = await safeAuthPack.getUserInfo();

      setUserInfo(userInfo);

      if (web3Provider) {
        const provider = new BrowserProvider(
          safeAuthPack.getProvider() as Eip1193Provider
        );
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        setProvider(provider);
      }
    })();
  }, [isAuthenticated, safeAuthPack]);
  if (renderd)
    return (
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          checkInstallationImmediately: false,
          defaultReadOnlyChainId: CHAIN_ID,
          dappMetadata: {
            name: "Demo React App",
            url: location.origin,
          },
        }}
      >
        {children}
      </MetaMaskProvider>
    );
  return <>{children}</>;
}
