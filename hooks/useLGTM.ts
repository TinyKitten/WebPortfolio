'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAnonymousAuthFn } from './useAnonymousAuthFn';

const useLGTM = (
  worksKey: string,
  workIndex: number
): {
  count: string;
  incrementCount: () => Promise<void>;
} => {
  const [count, setCount] = useState('');
  const [firstLoaded, setFirstLoaded] = useState(false);

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

      const { firebaseApp } = await import('../lib/firebase');
      const db = getDatabase(firebaseApp);
      const countRef = ref(db, lgtmDBKey);
      onValue(countRef, (snapshot) => {
        const data: number = snapshot.val() ?? 0;
        setCount(data.toLocaleString());
        setFirstLoaded(true);
      });
    };
    if (!firstLoaded) {
      fetchAsync();
    }
  }, [firstLoaded, lgtmDBKey, worksKey]);

  const incrementCount = useCallback(async () => {
    await updateAuth();

    const fbDatabase = await import('firebase/database');
    const { getDatabase, increment, update, ref } = fbDatabase;

    const { firebaseApp } = await import('../lib/firebase');
    const db = getDatabase(firebaseApp);
    update(ref(db), {
      [lgtmDBKey]: increment(1),
    });
  }, [lgtmDBKey, updateAuth]);

  return {
    count,
    incrementCount,
  };
};

export default useLGTM;
