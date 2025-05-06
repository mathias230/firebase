"use client";

import React, { useState, useEffect } from 'react';

const MAX_ELEMENTS = 30; // Limit the number of elements for performance

interface AnimatedElement {
  id: number;
  type: 'heart' | 'petal';
  style: React.CSSProperties;
}

export function AnimationsSection() {
  const [elements, setElements] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElements(prevElements => {
        // Remove oldest element if limit is reached
        const currentElements = prevElements.length >= MAX_ELEMENTS
          ? prevElements.slice(1)
          : prevElements;

        // Add a new element
        const id = Date.now() + Math.random();
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${8 + Math.random() * 8}s`; // Random duration between 8s and 16s
        const delay = `${Math.random() * 5}s`; // Random delay up to 5s
        const type = Math.random() > 0.5 ? 'heart' : 'petal';
        const size = `${15 + Math.random() * 15}px`; // Random size

        const style: React.CSSProperties = {
          left,
          animationDuration,
          animationDelay: delay,
          width: size,
          height: type === 'heart' ? size : `${parseFloat(size) * 1.5}px`, // Petals are taller
          '--delay': delay, // For petal animation variant
        };

         if (type === 'heart') {
             // Adjust heart pseudo-element sizes
             style['--heart-size'] = size;
             style['--heart-top-offset'] = `-${parseFloat(size) / 2}px`;
             style['--heart-left-offset'] = `${parseFloat(size) / 2}px`;
         }


        return [...currentElements, { id, type, style }];
      });
    }, 1000); // Add a new element every second

    return () => clearInterval(intervalId);
  }, []);

   // Cleanup old elements that have finished animating (optional, CSS handles opacity)
   useEffect(() => {
    const timers = elements.map(el => {
      const duration = parseFloat(el.style.animationDuration || '10s');
      const delay = parseFloat(el.style.animationDelay || '0s');
      return setTimeout(() => {
        setElements(prev => prev.filter(e => e.id !== el.id));
      }, (duration + delay) * 1000 + 500); // Remove after animation + buffer
    });

    return () => timers.forEach(clearTimeout);
   }, [elements]);


  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {elements.map(el => (
        <div
          key={el.id}
          className={el.type === 'heart' ? 'heart' : 'petal'}
          style={{
            ...el.style,
            ...(el.type === 'heart' && {
                 '::before': {
                    top: `-${parseFloat(el.style.width || '20px') / 2}px`,
                 },
                 '::after': {
                    left: `${parseFloat(el.style.width || '20px') / 2}px`,
                 }
            } as React.CSSProperties) // Need to handle pseudo-elements differently if dynamic size is crucial
          }}
        />
      ))}
    </div>
  );
}
