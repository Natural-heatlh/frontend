import {useEffect, useRef} from 'react';

export const id = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Date.now()
      .toString()
      .substr(5) +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
