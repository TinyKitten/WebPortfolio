import {
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useFirebaseApp } from './useFirebaseApp';

const useAnonymousAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  const firebase = useFirebaseApp();

  const updateUserState = useCallback(async () => {
    const auth = initializeAuth(firebase, {});
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        const credential = await signInAnonymously(auth);
        setUser(credential.user);
      }
    });
  }, [firebase]);

  useEffect(() => {
    updateUserState();
  }, [updateUserState]);

  return user;
};

export default useAnonymousAuth;
