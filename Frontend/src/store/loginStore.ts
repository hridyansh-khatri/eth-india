import { create } from 'zustand';
import { persist } from 'zustand/middleware'


interface PersistLoginStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  authenticationMethod: 'metamask' | 'safeauth' | undefined
  setAuthenticationMethod : (authenticationMethod: 'metamask' | 'safeauth') => void
}

export const usePersistLoginStore = create<PersistLoginStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
  
      authenticationMethod: undefined,
      setAuthenticationMethod: (authenticationMethod)=> set(() => ({authenticationMethod})),
    }),
    {
      name: 'loginStore',
    },
  ),
)