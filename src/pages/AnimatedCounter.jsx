import React, { useEffect } from 'react';
import {useInView, useSpring } from 'framer-motion';

const AnimatedCounter = ({ value }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const animatedValue = useSpring(0, {
    damping: 100,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      animatedValue.set(value);
    }
  }, [isInView, value, animatedValue]);

  useEffect(() => {
    const unsubscribe = animatedValue.onChange((latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString();
      }
    });
    return () => unsubscribe();
  }, [animatedValue]);

  return <span ref={ref}>0</span>;
};

export default AnimatedCounter;