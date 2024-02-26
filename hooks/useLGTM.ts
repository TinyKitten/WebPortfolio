import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAnonymousAuthFn } from './useAnonymousAuthFn';
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

  const firebase = useFirebaseApp();
  const updateAuth = useAnonymousAuthFn();

  const lgtmDBKey = useMemo(
    () => worksKey && `lgtm/${worksKey}/${workIndex}`,
    [workIndex, worksKey]
  );

  useEffect(() => {
    const fetchAsync = async () => {
      if (!worksKey) {
        return;
      }

      const fbDatabase = await import('firebase/database');
      const { getDatabase, onValue, ref } = fbDatabase;

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
    await updateAuth();

    const fbDatabase = await import('firebase/database');
    const { getDatabase, increment, update, ref } = fbDatabase;

    const db = getDatabase(firebase);
    update(ref(db), {
      [lgtmDBKey]: increment(1),
    });
  }, [firebase, lgtmDBKey, updateAuth]);

  return {
    count,
    incrementCount,
  };
};

export default useLGTM;
