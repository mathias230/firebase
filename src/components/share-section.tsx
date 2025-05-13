"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CountdownState {
    total: number; // Remaining milliseconds
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const TARGET_DATE_STRING = '2025-06-19T07:00:00'; // June 19, 2025 7:00 AM

export function ShareSection() {
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    const targetDateInstance = new Date(TARGET_DATE_STRING);

    const calculateAndUpdateCountdown = (): boolean => {
      const now = new Date();
      let differenceInMs = targetDateInstance.getTime() - now.getTime();

      if (differenceInMs <= 0) {
        setCountdown({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUnlocked(true);
        return true; // Countdown finished
      }

      const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      let remainderMs = differenceInMs % (1000 * 60 * 60 * 24);

      const hours = Math.floor(remainderMs / (1000 * 60 * 60));
      remainderMs %= (1000 * 60 * 60);

      const minutes = Math.floor(remainderMs / (1000 * 60));
      remainderMs %= (1000 * 60);

      const seconds = Math.floor(remainderMs / 1000);

      setCountdown({ total: differenceInMs, days, hours, minutes, seconds });
      setIsUnlocked(false);
      return false; // Countdown ongoing
    };
    
    if (calculateAndUpdateCountdown()) {
      return;
    }

    const intervalId = setInterval(() => {
      if (calculateAndUpdateCountdown()) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const navigateToPage = () => {
    router.push('/otra-pagina');
  };

  if (!hasMounted || countdown === null) {
    return (
      <section id="share" className="py-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          {/* Placeholder for Countdown Text Area */}
          <div className="mb-4">
            <div className="h-4 w-24 bg-muted rounded-md mx-auto mb-1 animate-pulse"></div> {/* For "Disponible en:" */}
            <div className="h-6 w-64 bg-muted rounded-md mx-auto animate-pulse"></div>   {/* For the countdown string itself */}
          </div>
          {/* Placeholder for Button */}
          <div className="h-10 w-20 bg-muted rounded-md mx-auto animate-pulse"></div> {/* For "0.12" button */}
        </div>
      </section>
    );
  }

  return (
    <section id="share" className="py-8 bg-background">
      <div className="container mx-auto px-4 text-center">
        {/* Countdown Text Area */}
        {!isUnlocked && countdown && countdown.total > 0 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Disponible en:</p>
            <p className="text-lg text-foreground">
              {countdown.days} día{countdown.days !== 1 ? 's' : ''}, {countdown.hours} hora{countdown.hours !== 1 ? 's' : ''}, {countdown.minutes} minuto{countdown.minutes !== 1 ? 's' : ''}, {countdown.seconds} segundo{countdown.seconds !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Button */}
        <Button
            variant="default" // Use default and customize background
            size="default"
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md"
            onClick={navigateToPage}
            disabled={!isUnlocked}
        >
          0.12
        </Button>
      </div>
    </section>
  );
}
