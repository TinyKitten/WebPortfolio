import { useCallback } from 'react';
import { useAnonymousUserStore } from './useAnonymousUserStore';

export const useAnonymousAuthFn = (): (() => Promise<void>) => {
  const setUser = useAnonymousUserStore((state) => state.setUser);
  const updateUserState = useCallback(async () => {
    const { initializeAuth, signInAnonymously } = await import('firebase/auth');

    const { firebaseApp } = await import('../lib/firebase');
    const auth = initializeAuth(firebaseApp, {});

    const credential = await signInAnonymously(auth);
    setUser(credential.user);
  }, [setUser]);

  return updateUserState;
};
