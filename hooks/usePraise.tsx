import { useCallback, useEffect, useState } from 'react';
import useAnonymousAuth from './useAnonymousAuth';

const usePraise = (
  ready: boolean,
  onExceeded: () => void
): {
  count: number;
  incrementCount: () => Promise<void>;
  exceeded: boolean;
} => {
  const [count, setCount] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [repeatTimes, setRepeatTimes] = useState(0);
  const [isExceeded, setIsExceeded] = useState(false);

  const fbUser = useAnonymousAuth();

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
    if (!fbUser || isExceeded) {
      return;
    }

    setRepeatTimes((prev) => prev + 1);
    const { setDoc, doc, getFirestore, updateDoc, increment } = await import(
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
      const visitorDocRef = doc(db, 'visitors', fbUser.uid);
      await setDoc(visitorDocRef, {
        exceeded: true,
      });
    }
  }, [fbUser, isExceeded, onExceeded, repeatTimes]);

  useEffect(() => {
    const fetchIsExceededAsync = async () => {
      if (!fbUser) {
        return;
      }
      const { doc, onSnapshot, getFirestore } = await import(
        'firebase/firestore'
      );
      const { getFirebaseApp } = await import('../utils/firebase');
      const firebase = await getFirebaseApp();
      const db = getFirestore(firebase);

      const visitorDocRef = doc(db, 'visitors', fbUser.uid);
      onSnapshot(visitorDocRef, (snapshot) => {
        if (snapshot.data()?.exceeded) {
          setIsExceeded(true);
        }
      });
    };
    fetchIsExceededAsync();
  }, [fbUser]);

  return {
    count,
    incrementCount,
    exceeded: isExceeded,
  };
};

export default usePraise;
