import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText: React.FC<{ options: any }> = ({ options }) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const typed = new Typed(ref.current, options);

    return () => {
      if (!typed) {
        return;
      }
      typed.destroy();
    };
  }, [ref, options]);

  return (
    <div>
      <span ref={ref} />
    </div>
  );
};

export default TypedText
