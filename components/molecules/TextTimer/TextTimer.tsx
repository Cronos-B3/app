import { BaseTextProps } from 'components/atoms/BaseText/BaseText';
import Text from 'components/atoms/BaseText/Text';
import React, { useEffect, useState } from 'react';

interface TextTimerProps extends BaseTextProps {
  msLeft: number;
  countEnded?: () => void;
}

const TextTimer = ({ msLeft, countEnded, ...props }: TextTimerProps) => {
  // if (__DEV__) console.log('🐙 - TextTimer');

  const [timeLeft, setTimeLeft] = useState(() => Math.floor(msLeft / 1000) - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      const timerMinusOne = timeLeft - 1;
      if (timerMinusOne > 0) {
        setTimeLeft(timerMinusOne);
      } else {
        clearInterval(interval);
        countEnded && countEnded();
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

  let timeString = '';

  if (!isDaysZero) {
    if (days < 10) timeString += `0${days}:`;
    else timeString += `${days}:`;
  }

  if (!isHoursZero || !isDaysZero) {
    if (hours < 10) timeString += `0${hours}:`;
    else timeString += `${hours}:`;
  }

  if (!isMinutesZero || !isHoursZero || !isDaysZero) {
    if (minutes < 10) timeString += `0${minutes}:`;
    else timeString += `${minutes}:`;
  }

  if (seconds < 10) timeString += `0${seconds}`;
  else timeString += `${seconds}`;

  return <Text {...props}>{timeString}</Text>;
};

export default TextTimer;
