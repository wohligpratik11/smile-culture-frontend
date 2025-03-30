// hooks/useSlotLogic.js
import { useState, useEffect } from 'react';

const useSlotLogic = (totalSlots, startTime) => {
  const [remainingSlots, setRemainingSlots] = useState(totalSlots);
  const [percentageBooked, setPercentageBooked] = useState(0);

  useEffect(() => {
    const updateSlots = () => {
      const now = new Date();
      const hoursSinceStart = Math.floor(
        (now.getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60)
      );
      const slotsBooked = Math.min(hoursSinceStart, totalSlots);
      const newRemainingSlots = Math.max(totalSlots - slotsBooked, 0);
      const newPercentage = Math.floor((slotsBooked / totalSlots) * 100);

      setRemainingSlots(newRemainingSlots);
      setPercentageBooked(newPercentage);
    };

    updateSlots();
    const interval = setInterval(updateSlots, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [totalSlots, startTime]);

  return { remainingSlots, percentageBooked };
};

export default useSlotLogic;
