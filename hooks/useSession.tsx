import {
  useContext,
  createContext,
  type PropsWithChildren,
  useMemo,
} from 'react';
import { useStorageState } from './useStorageState';
import { AsyncStorage } from '@/services/AsyncStorage';
import { AsyncStorageKeys } from '@/constants/AsyncStorageKeys';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const value = useMemo(
    () => ({
      signIn: () => {
        setSession('xxx');
      },
      signOut: async () => {
        await AsyncStorage.remove(AsyncStorageKeys.chat);
        setSession(null);
      },
      session,
      isLoading,
    }),
    [session, isLoading, setSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}
