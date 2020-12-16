import { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const {
  REACT_APP_FIR_API_KEY,
  REACT_APP_FIR_AUTH_DOMAIN,
  REACT_APP_FIR_DATABASE_URL,
  REACT_APP_FIR_PROJECT_ID,
  REACT_APP_FIR_STORAGE_BUCKET,
  REACT_APP_FIR_MESSAGING_SENDER_ID,
  REACT_APP_FIR_APP_ID,
} = process.env;

const usePraise = (): {
  count: number;
  incrementCount: () => Promise<void>;
} => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: REACT_APP_FIR_API_KEY,
        authDomain: REACT_APP_FIR_AUTH_DOMAIN,
        databaseURL: REACT_APP_FIR_DATABASE_URL,
        projectId: REACT_APP_FIR_PROJECT_ID,
        storageBucket: REACT_APP_FIR_STORAGE_BUCKET,
        messagingSenderId: REACT_APP_FIR_MESSAGING_SENDER_ID,
        appId: REACT_APP_FIR_APP_ID,
      });
    }
    const f = async () => {
      await firebase.auth().signInAnonymously();
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
