import { initializeAuth, signInAnonymously } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { firebaseApp } from '../lib/firebase';
import { anonymousUserAtom } from '../state/anonUser';

export const useAnonymousAuthFn = (): (() => Promise<void>) => {
  const setUser = useSetAtom(anonymousUserAtom);

  const updateUserState = useCallback(async () => {
    const auth = initializeAuth(firebaseApp, {});

    const credential = await signInAnonymously(auth);
    setUser((prev) => prev ?? credential.user);
  }, [setUser]);

  return updateUserState;
};
