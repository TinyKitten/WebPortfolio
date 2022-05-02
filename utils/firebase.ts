import { initializeApp } from 'firebase/app';

export default initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIR_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIR_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIR_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIR_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIR_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIR_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIR_APP_ID,
});
