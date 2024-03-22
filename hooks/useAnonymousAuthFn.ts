import { useCallback } from 'react';

export const useAnonymousAuthFn = (): (() => Promise<void>) => {
  const updateUserState = useCallback(async () => {
    const { initializeAuth, signInAnonymously } = await import('firebase/auth');

    const { firebaseApp } = await import('../lib/firebase');
    const auth = initializeAuth(firebaseApp, {});

    await signInAnonymously(auth);
  }, []);

  return updateUserState;
};
