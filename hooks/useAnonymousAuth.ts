import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import getFirebaseApp from '../utils/firebase';

const useAnonymousAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  const updateUserState = useCallback(async () => {
    const firebase = await getFirebaseApp();
    const auth = getAuth(firebase);
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
