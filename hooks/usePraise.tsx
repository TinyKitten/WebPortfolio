import {
  getDatabase,
  increment,
  onValue,
  ref,
  update,
} from 'firebase/database';
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
    if (!user) {
      return;
    }

    setRepeatTimes((prev) => prev + 1);

    const db = getDatabase(firebase);
    // const countRef = ref(db, 'praise/count');
    update(ref(db), {
      'praise/count': increment(1),
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
