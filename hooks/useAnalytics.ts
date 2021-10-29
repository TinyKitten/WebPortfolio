import galite from 'ga-lite';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const isShouldNoop = !GA_ID || process.env.NODE_ENV === 'development';

const useAnalytics = (): { recordPV: () => void } => {
  useEffect(() => {
    if (!isShouldNoop) {
      galite('create', GA_ID, 'auto');
    }
  }, []);

  const recordPV = () => {
    if (!isShouldNoop) {
      galite('send', 'pageview');
    }
  };

  return { recordPV };
};

export default useAnalytics;
