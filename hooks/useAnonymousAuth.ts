import {
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from 'firebase/auth';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { anonymousUserAtom } from '../state/anonUser';
import { useFirebaseApp } from './useFirebaseApp';

const useAnonymousAuth = (): User | null => {
  const [user, setUser] = useAtom(anonymousUserAtom);
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
  }, [firebase, setUser]);

  useEffect(() => {
    updateUserState();
  }, [updateUserState]);

  return user || null;
};

export default useAnonymousAuth;
