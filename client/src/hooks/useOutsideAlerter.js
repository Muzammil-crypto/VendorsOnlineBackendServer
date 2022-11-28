import { useRef, useEffect, useState } from 'react';

const useOutsideAlerter = (initialState) => {
  const [visible, setVisible] = useState(initialState);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setVisible(false);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Escape') setVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyPress, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyPress, true);
    };
  }, [ref]);

  return [visible, setVisible, ref];
};

export default useOutsideAlerter;
