import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 text-center bg-gradient-to-r from-primary/70 via-background to-secondary/70 text-muted-foreground">
      <p className="flex items-center justify-center gap-1">
        Hecho con <Heart className="text-accent inline-block" size={16} fill="currentColor" /> por [Tu Nombre o Apodo] &copy; {currentYear}
      </p>
      {/* Optional: Add a link back or a small message */}
      {/* <p className="text-xs mt-1">Para mi amor eterno</p> */}
    </footer>
  );
}
