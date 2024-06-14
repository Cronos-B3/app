import { useEffect, useState } from 'react';

type Timer = {
  time: number;
  onEnd?: () => void;
};

const useTimer = ({ time, onEnd }: Timer) => {
  const [timeLeft, setTimeLeft] = useState(() => Math.floor(time / 1000) - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      const timerMinusOne = timeLeft - 1;
      if (timerMinusOne > 0) {
        setTimeLeft(timerMinusOne);
      } else {
        clearInterval(interval);
        onEnd && onEnd();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const seconds = timeLeft % 60;
  const minutes = Math.floor((timeLeft / 60) % 60);
  const hours = Math.floor((timeLeft / (60 * 60)) % 24);
  const days = Math.floor(timeLeft / (60 * 60 * 24));

  const isMinutesZero = minutes <= 0;
  const isHoursZero = hours <= 0;
  const isDaysZero = days <= 0;

  let timeToString = '';

  if (!isDaysZero) {
    if (days < 10) timeToString += `0${days}:`;
    else timeToString += `${days}:`;
  }

  if (!isHoursZero || !isDaysZero) {
    if (hours < 10) timeToString += `0${hours}:`;
    else timeToString += `${hours}:`;
  }

  if (!isMinutesZero || !isHoursZero || !isDaysZero) {
    if (minutes < 10) timeToString += `0${minutes}:`;
    else timeToString += `${minutes}:`;
  }

  if (seconds < 10) timeToString += `0${seconds}`;
  else timeToString += `${seconds}`;

  return { timeLeft, timeToString };
};

export default useTimer;
