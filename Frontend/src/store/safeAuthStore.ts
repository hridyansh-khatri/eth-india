import { AuthKitSignInData, SafeAuthPack, SafeAuthUserInfo } from '@safe-global/auth-kit';
import { BrowserProvider } from 'ethers';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface SafeAutState {
  safeAuthPack: SafeAuthPack | undefined
  setSafeAuthPack: (safeAuthPack: SafeAuthPack | undefined) => void
  provider: BrowserProvider | undefined
  setProvider: (provider: BrowserProvider) => void
}

export const useSafeAuthStore = create<SafeAutState>()(
  (set, get) => ({
    safeAuthPack: undefined,
    setSafeAuthPack: (safeAuthPack) => set(() => ({ safeAuthPack })),
    provider: undefined,
    setProvider: (provider) => set(() => ({ provider })),
  })
)

interface SafeAuthPersistStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  safeAuthSignInResponse: AuthKitSignInData | undefined
  setSafeAuthSignInResponse : (safeAuthSignInResponse: AuthKitSignInData | undefined) => void;
  userInfo: SafeAuthUserInfo | undefined
  setUserInfo: (userInfo: SafeAuthUserInfo| undefined) => void
}

export const usePersistSafeAuthStore = create<SafeAuthPersistStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
  
      safeAuthSignInResponse: undefined,
      setSafeAuthSignInResponse: (safeAuthSignInResponse)=> set(() => ({safeAuthSignInResponse})),
  
      userInfo: undefined,
      setUserInfo: (userInfo)=> set(() => ({userInfo})),    }),
    {
      name: 'safeAuthStore',
    },
  ),
)
