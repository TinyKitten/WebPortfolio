import { useCallback, useEffect, useState } from 'react';

const NEXT_PUBLIC_FIR_API_KEY = process.env.NEXT_PUBLIC_FIR_API_KEY;
const NEXT_PUBLIC_FIR_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIR_AUTH_DOMAIN;
const NEXT_PUBLIC_FIR_DATABASE_URL = process.env.NEXT_PUBLIC_FIR_DATABASE_URL;
const NEXT_PUBLIC_FIR_PROJECT_ID = process.env.NEXT_PUBLIC_FIR_PROJECT_ID;
const NEXT_PUBLIC_FIR_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIR_STORAGE_BUCKET;
const NEXT_PUBLIC_FIR_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIR_MESSAGING_SENDER_ID;
const NEXT_PUBLIC_FIR_APP_ID = process.env.NEXT_PUBLIC_FIR_APP_ID;
const NEXT_PUBLIC_MAX_REPEAT_COUNT = process.env.NEXT_PUBLIC_MAX_REPEAT_COUNT;

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

  const getFirebase = useCallback(async () => {
    const firebase = (await import('firebase/app')).default;

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: NEXT_PUBLIC_FIR_API_KEY,
        authDomain: NEXT_PUBLIC_FIR_AUTH_DOMAIN,
        databaseURL: NEXT_PUBLIC_FIR_DATABASE_URL,
        projectId: NEXT_PUBLIC_FIR_PROJECT_ID,
        storageBucket: NEXT_PUBLIC_FIR_STORAGE_BUCKET,
        messagingSenderId: NEXT_PUBLIC_FIR_MESSAGING_SENDER_ID,
        appId: NEXT_PUBLIC_FIR_APP_ID,
      });
    }

    return firebase;
  }, []);

  useEffect(() => {
    const fetchAsync = async () => {
      const firebase = await getFirebase();
      await import('firebase/firestore');

      const countDoc = await firebase
        .firestore()
        .collection('public')
        .doc('praise')
        .get();
      const data = countDoc.data();
      if (data) {
        setCount(data.count);
      }
      firebase
        .firestore()
        .collection('public')
        .doc('praise')
        .onSnapshot((snapshot) => {
          const snapshotData = snapshot.data();
          setCount(snapshotData.count);
        });
      setFirstLoaded(true);
    };
    if (ready && !firstLoaded) {
      fetchAsync();
    }
  }, [firstLoaded, getFirebase, ready]);

  const incrementCount = useCallback(async () => {
    setRepeatTimes((prev) => prev + 1);
    const firebase = await getFirebase();
    await import('firebase/auth');

    if (!firebase.auth().currentUser) {
      await firebase.auth().signInAnonymously();
    }

    const countRef = firebase.firestore().collection('public').doc('praise');
    await countRef.update('count', firebase.firestore.FieldValue.increment(1));
  }, [getFirebase]);

  const resetExceeded = () => setRepeatTimes(0);

  return {
    count,
    incrementCount,
    exceeded: repeatTimes >= Number(NEXT_PUBLIC_MAX_REPEAT_COUNT),
    resetExceeded,
  };
};

export default usePraise;
