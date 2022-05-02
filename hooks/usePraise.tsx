import {
  doc,
  getDoc,
  getFirestore,
  increment,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import getFirebaseApp from '../utils/firebase';
import useAnonymousAuth from './useAnonymousAuth';

const usePraise = (
  ready: boolean
): {
  count: number;
  resetExceeded: () => void;
  incrementCount: () => Promise<void>;
  exceeded: boolean;
} => {
  const [count, setCount] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [repeatTimes, setRepeatTimes] = useState(0);

  const fbUser = useAnonymousAuth();

  useEffect(() => {
    const fetchAsync = async () => {
      const firebase = await getFirebaseApp();
      const db = getFirestore(firebase);
      const countDocRef = doc(db, 'public/praise');
      const countDocSnap = await getDoc(countDocRef);
      const data = countDocSnap.data();
      if (data) {
        setCount(data.count);
      }
      onSnapshot(doc(db, 'public/praise'), (d) => {
        setCount(d.data().count);
      });
      setFirstLoaded(true);
    };
    if (ready && !firstLoaded) {
      fetchAsync();
    }
  }, [firstLoaded, ready]);

  const incrementCount = useCallback(async () => {
    setRepeatTimes((prev) => prev + 1);
    const firebase = await getFirebaseApp();
    const db = getFirestore(firebase);

    if (!fbUser) {
      return;
    }

    const countDocRef = doc(db, 'public/praise');
    await updateDoc(countDocRef, {
      count: increment(1),
    });
  }, [fbUser]);

  const resetExceeded = () => setRepeatTimes(0);

  return {
    count,
    incrementCount,
    exceeded: repeatTimes >= Number(process.env.NEXT_PUBLIC_MAX_REPEAT_COUNT),
    resetExceeded,
  };
};

export default usePraise;
