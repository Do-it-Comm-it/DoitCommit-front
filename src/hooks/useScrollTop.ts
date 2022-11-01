import React, { useState, useEffect, useCallback } from 'react';
const useScrollTop = (currentY: number) => {
  const [showButton, setShowButton] = useState(false);
  const onScroll = useCallback(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > currentY) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => window.removeEventListener('scroll', handleShowButton); // clean up
  }, []);
  return {
    onScroll,
    showButton,
  };
};

export default useScrollTop;
