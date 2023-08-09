import { useEffect } from 'react';

const useOutsideClick = (callback, ref) => {
  const handleClick = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
