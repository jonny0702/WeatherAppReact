import { useState, useEffect } from 'react';

const useProgressAir = (Aqi) => {
  const [progress, setProgress] = useState({
    percentage: 0,
    color: 'good',
    status: 'Low Healt Risk',
  });
  const handleState = (aqi) => {
    switch (aqi) {
      case 1:
        setProgress({ ...progress, percentage: 20 });
        break;
      case 2:
        setProgress({
          ...progress,
          percentage: 40,
          color: 'fair',
          status: 'Moderate Healt Risk',
        });
        break;
      case 3:
        setProgress({
          ...progress,
          percentage: 60,
          color: 'moderate',
        });
        break;
      case 4:
        setProgress({
          ...progress,
          percentage: 80,
          color: 'poor',
          status: 'High Healt Risk',
        });
        break;
      case 5:
        setProgress({
          ...progress,
          percentage: 100,
          color: 'veryPoor',
          status: 'Very High Healt Risk',
        });
        break;
    }
  };
  useEffect(() => {
    handleState(Aqi);
    return () => handleState;
  }, [Aqi]);

  return progress;
};
export default useProgressAir;
