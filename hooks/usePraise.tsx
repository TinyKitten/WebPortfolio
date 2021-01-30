import { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// https://github.com/vercel/next.js/issues/19420
const NEXT_PUBLIC_FIR_API_KEY = process.env.NEXT_PUBLIC_FIR_API_KEY;
const NEXT_PUBLIC_FIR_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIR_AUTH_DOMAIN;
const NEXT_PUBLIC_FIR_DATABASE_URL = process.env.NEXT_PUBLIC_FIR_DATABASE_URL;
const NEXT_PUBLIC_FIR_PROJECT_ID = process.env.NEXT_PUBLIC_FIR_PROJECT_ID;
const NEXT_PUBLIC_FIR_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_FIR_STORAGE_BUCKET;
const NEXT_PUBLIC_FIR_MESSAGING_SENDER_ID =
  process.env.NEXT_PUBLIC_FIR_MESSAGING_SENDER_ID;
const NEXT_PUBLIC_FIR_APP_ID = process.env.NEXT_PUBLIC_FIR_APP_ID;

const usePraise = (): {
  count: number;
  incrementCount: () => Promise<void>;
} => {
  const [count, setCount] = useState(0);
  useEffect(() => {
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
    const f = async () => {
      const countDoc = await firebase
        .firestore()
        .collection('public')
        .doc('praise')
        .get();
      const data = countDoc.data();
      if (data) {
        setCount(data.count);
      }
    };
    f();
  }, []);

  const incrementCount = useCallback(async () => {
    if (!firebase.auth().currentUser) {
      await firebase.auth().signInAnonymously();
    }

    const countRef = firebase.firestore().collection('public').doc('praise');
    await countRef.update('count', firebase.firestore.FieldValue.increment(1));
    const countDoc = await countRef.get();
    const data = countDoc.data();
    if (data) {
      setCount(data.count);
    }
  }, []);

  return {
    count,
    incrementCount,
  };
};

export default usePraise;
