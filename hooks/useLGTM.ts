import {
  getDatabase,
  increment,
  onValue,
  ref,
  update,
} from 'firebase/database';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useAnonymousAuth from './useAnonymousAuth';
import { useFirebaseApp } from './useFirebaseApp';

const useLGTM = (
  worksKey: string,
  workIndex: number
): {
  count: number;
  incrementCount: () => Promise<void>;
} => {
  const [count, setCount] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);

  const user = useAnonymousAuth();
  const firebase = useFirebaseApp();

  const lgtmDBKey = useMemo(
    () => worksKey && `lgtm/${worksKey}_${workIndex}`,
    [workIndex, worksKey]
  );

  useEffect(() => {
    const fetchAsync = async () => {
      if (!worksKey) {
        return;
      }
      const db = getDatabase(firebase);
      const countRef = ref(db, lgtmDBKey);
      onValue(countRef, (snapshot) => {
        const data = snapshot.val() as number | null;
        if (data) {
          setCount(data);
          setFirstLoaded(true);
        }
      });
    };
    if (!firstLoaded) {
      fetchAsync();
    }
  }, [firebase, firstLoaded, lgtmDBKey, worksKey]);

  const incrementCount = useCallback(async () => {
    if (!user) {
      return;
    }

    const db = getDatabase(firebase);
    update(ref(db), {
      [lgtmDBKey]: increment(1),
    });
  }, [firebase, lgtmDBKey, user]);

  return {
    count,
    incrementCount,
  };
};

export default useLGTM;
