import { initializeAuth, signInAnonymously } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { anonymousUserAtom } from '../state/anonUser';
import { useFirebaseApp } from './useFirebaseApp';

export const useAnonymousAuthFn = (): (() => Promise<void>) => {
  const setUser = useSetAtom(anonymousUserAtom);
  const firebase = useFirebaseApp();

  const updateUserState = useCallback(async () => {
    const auth = initializeAuth(firebase, {});

    const credential = await signInAnonymously(auth);
    setUser((prev) => prev ?? credential.user);
  }, [firebase, setUser]);

  return updateUserState;
};
