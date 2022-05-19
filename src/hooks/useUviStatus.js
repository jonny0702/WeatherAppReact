import { useState, useEffect } from 'react';
const useUviStatus = (UVI) => {
  const [uviStat, setUviStat] = useState({
    progress: 0,
    color: 'good',
    status: 'Low',
  });
  const handleState = (uvi) => {
    if (uvi <= 2) return setUviStat({ ...uviStat, progress: 20 });
    if (3 <= uvi && uvi <= 5)
      return setUviStat({
        ...uviStat,
        progress: 40,
        color: 'fair',
        status: 'Moderate',
      });
    if (6 <= uvi && uvi <= 8)
      return setUviStat({
        ...uviStat,
        progress: 60,
        color: 'moderate',
        status: 'High',
      });
    if (8 <= uvi && uvi <= 10)
      return setUviStat({
        ...uviStat,
        progress: 80,
        color: 'poor',
        status: 'Very High',
      });
    if (uvi >= 11)
      return setUviStat({
        ...uviStat,
        progress: 100,
        color: 'veryPoor',
        status: 'Extreme',
      });
  };
  useEffect(() => {
    handleState(UVI);
    return () => handleState;
  }, [UVI]);
  return uviStat;
};

export default useUviStatus;
