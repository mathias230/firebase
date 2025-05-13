"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
// Removed useToast and other share-related imports as they are not currently used.
// If sharing functionality is re-enabled, these might be needed:
// import { useToast } from "@/hooks/use-toast";
// import { Share2, Copy } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

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
    // All date calculations are now strictly within useEffect

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
    
    // Perform initial calculation and update state
    if (calculateAndUpdateCountdown()) {
      // Already unlocked, no interval needed
      return;
    }

    // If not unlocked, set up the interval to update the countdown
    const intervalId = setInterval(() => {
      if (calculateAndUpdateCountdown()) {
        clearInterval(intervalId); // Stop interval once unlocked
      }
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this runs once on mount (client-side)

  const navigateToPage = () => {
    router.push('/otra-pagina');
  };

  // Render placeholder or nothing until mounted and countdown is calculated client-side
  if (!hasMounted || countdown === null) {
    return (
      <section id="share" className="py-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          {/* Placeholder for the button that will show countdown or "0.12" */}
          <div className="h-11 w-48 bg-muted rounded-md mx-auto animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="share" className="py-8 bg-background">
      <div className="container mx-auto px-4 text-center">
        <Button 
            variant="outline" 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-md min-w-[200px] px-4" // Added min-width and padding for better text fit
            onClick={navigateToPage} 
            disabled={!isUnlocked}
        >
          {isUnlocked 
            ? "0.12" 
            : `Disponible en: ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`
          }
        </Button>
        
        {/* Social sharing dropdown is currently commented out as per implied focus change */}
        {/*
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button variant="outline" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-md ml-4">
              <Share2 className="mr-2" />
              Compartir Amor
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-popover border-accent/50">
             {shareOptions.map(option => ( // shareOptions would need to be defined
              <DropdownMenuItem key={option.name} asChild>
                <a href={option.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                  {option.icon} // SVG icons would need to be defined
                  <span>{option.name}</span>
                </a>
              </DropdownMenuItem>
            ))}
             <DropdownMenuItem onSelect={copyToClipboard} className="flex items-center gap-2 cursor-pointer"> // copyToClipboard would need to be defined
                <Copy />
                <span>Copiar Enlace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        */}
      </div>
    </section>
  );
}