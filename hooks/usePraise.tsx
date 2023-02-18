import {
  doc,
  getDoc,
  increment,
  initializeFirestore,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import useAnonymousAuth from './useAnonymousAuth';
import { useFirebaseApp } from './useFirebaseApp';

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

  const user = useAnonymousAuth();
  const firebase = useFirebaseApp();

  useEffect(() => {
    const fetchAsync = async () => {
      const db = initializeFirestore(firebase, {});
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
  }, [firebase, firstLoaded, ready]);

  const incrementCount = useCallback(async () => {
    if (!user) {
      return;
    }

    setRepeatTimes((prev) => prev + 1);

    const db = initializeFirestore(firebase, {});

    const countDocRef = doc(db, 'public/praise');
    await updateDoc(countDocRef, {
      count: increment(1),
    });
    if (repeatTimes >= Number(process.env.NEXT_PUBLIC_MAX_REPEAT_COUNT) - 1) {
      onExceeded();
    }
  }, [firebase, onExceeded, repeatTimes, user]);

  return {
    count,
    incrementCount,
  };
};

export default usePraise;
