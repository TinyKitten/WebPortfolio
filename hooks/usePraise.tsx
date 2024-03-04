'use client';
import { useCallback, useEffect, useState } from 'react';
import { useAnonymousAuthFn } from './useAnonymousAuthFn';
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

  const firebase = useFirebaseApp();
  const updateAuth = useAnonymousAuthFn();

  useEffect(() => {
    const fetchAsync = async () => {
      const fbDatabase = await import('firebase/database');
      const { getDatabase, onValue, ref } = fbDatabase;

      const db = getDatabase(firebase);
      const countRef = ref(db, 'praise/count');
      onValue(countRef, (snapshot) => {
        const data = snapshot.val() as number | null;
        if (data) {
          setCount(data);
          setFirstLoaded(true);
        }
      });
    };
    if (ready && !firstLoaded) {
      fetchAsync();
    }
  }, [firebase, firstLoaded, ready]);

  const incrementCount = useCallback(async () => {
    setRepeatTimes((prev) => prev + 1);

    await updateAuth();

    const fbDatabase = await import('firebase/database');
    const { getDatabase, increment, ref, update } = fbDatabase;
    const db = getDatabase(firebase);
    update(ref(db), {
      'praise/count': increment(1),
    });

    if (repeatTimes >= Number(process.env.NEXT_PUBLIC_MAX_REPEAT_COUNT) - 1) {
      onExceeded();
    }
  }, [firebase, onExceeded, repeatTimes, updateAuth]);

  return {
    count,
    incrementCount,
  };
};

export default usePraise;
