import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { anonymousUserAtom } from '../state/anonUser';

export const useAnonymousAuthFn = (): (() => Promise<void>) => {
  const setUser = useSetAtom(anonymousUserAtom);

  const updateUserState = useCallback(async () => {
    const { initializeAuth, signInAnonymously } = await import('firebase/auth');

    const { firebaseApp } = await import('../lib/firebase');
    const auth = initializeAuth(firebaseApp, {});

    const credential = await signInAnonymously(auth);
    setUser((prev) => prev ?? credential.user);
  }, [setUser]);

  return updateUserState;
};
