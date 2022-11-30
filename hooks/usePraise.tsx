import { useCallback, useEffect, useState } from 'react';
import useAnonymousAuth from './useAnonymousAuth';

const usePraise = (
  ready: boolean,
  onExceeded: () => void
): {
  count: number;
  incrementCount: () => Promise<void>;
} => {
  const [count, setCount] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [repeatTimes, setRepeatTimes] = useState(0);

  const { user } = useAnonymousAuth();

  useEffect(() => {
    const fetchAsync = async () => {
      const { doc, getDoc, getFirestore, onSnapshot } = await import(
        'firebase/firestore'
      );
      const { getFirebaseApp } = await import('../utils/firebase');

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
    if (!user) {
      return;
    }

    setRepeatTimes((prev) => prev + 1);
    const { doc, getFirestore, updateDoc, increment } = await import(
      'firebase/firestore'
    );
    const { getFirebaseApp } = await import('../utils/firebase');
    const firebase = await getFirebaseApp();
    const db = getFirestore(firebase);

    const countDocRef = doc(db, 'public/praise');
    await updateDoc(countDocRef, {
      count: increment(1),
    });
    if (repeatTimes >= Number(process.env.NEXT_PUBLIC_MAX_REPEAT_COUNT) - 1) {
      onExceeded();
    }
  }, [user, onExceeded, repeatTimes]);

  return {
    count,
    incrementCount,
  };
};

export default usePraise;
