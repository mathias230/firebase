import React from 'react';

export function Header() {
  return (
    <header className="py-8 text-center bg-gradient-to-r from-primary/70 via-background to-secondary/70">
      <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground tracking-tight" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Amor Eterno
      </h1>
      {/* Optional: Add a subtle tagline */}
      {/* <p className="mt-2 text-lg text-muted-foreground">Para mi persona especial</p> */}
    </header>
  );
}

// Ensure the font is loaded, either via next/font or a <link> in layout.tsx/Head
// If using Google Fonts, add this to layout.tsx:
/*
import { Dancing_Script } from 'next/font/google';
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap', // Ensures text is visible while font loads
});
// Then add dancingScript.variable to the body className in layout.tsx
// And update the style in Header: style={{ fontFamily: 'var(--font-dancing-script)' }}
// For simplicity here, assuming a CSS import or link tag approach.
*/
