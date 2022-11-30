import type { User } from 'firebase/auth';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { visitorAtom } from '../atoms/visitor';

const useAnonymousAuth = (): {
  user: User | null;
  isReturningVisitor: boolean;
  initialized: boolean;
} => {
  const [{ isReturningVisitor, user, initialized }, setVisitor] = useAtom(
    visitorAtom
  );

  const updateUserState = useCallback(async () => {
    const { getFirebaseApp } = await import('../utils/firebase');
    const firebase = await getFirebaseApp();
    const {
      browserLocalPersistence,
      onAuthStateChanged,
      signInAnonymously,
      initializeAuth,
    } = await import('firebase/auth');
    const auth = initializeAuth(firebase, {
      persistence: browserLocalPersistence,
    });
    onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setVisitor((prev) => ({
          ...prev,
          isReturningVisitor: false,
          initialized: true,
        }));

        const credential = await signInAnonymously(auth);
        setVisitor((prev) => ({ ...prev, user: credential.user }));
        return;
      }
      setVisitor((prev) =>
        prev.initialized
          ? prev
          : {
              isReturningVisitor: true,
              user: authUser,
              initialized: true,
            }
      );
    });
  }, [setVisitor]);

  useEffect(() => {
    updateUserState();
  }, [updateUserState]);

  return { isReturningVisitor, user, initialized };
};

export default useAnonymousAuth;
