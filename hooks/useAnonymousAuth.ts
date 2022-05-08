import type { User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

const useAnonymousAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  const updateUserState = useCallback(async () => {
    const { getFirebaseApp } = await import('../utils/firebase');
    const firebase = await getFirebaseApp();
    const {
      indexedDBLocalPersistence,
      browserLocalPersistence,
      onAuthStateChanged,
      signInAnonymously,
      initializeAuth,
    } = await import('firebase/auth');
    const auth = initializeAuth(firebase, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
    });
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        const credential = await signInAnonymously(auth);
        setUser(credential.user);
      }
    });
  }, []);

  useEffect(() => {
    updateUserState();
  }, [updateUserState]);

  return user;
};

export default useAnonymousAuth;
