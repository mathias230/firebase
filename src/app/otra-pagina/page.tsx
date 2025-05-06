
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function OtraPagina() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
        ¡Feliz Aniversario!
      </h1>
      <p className="text-lg text-foreground mb-8 max-w-md">
        Aquí comienza un nuevo capítulo lleno de sorpresas y amor. Gracias por estos 11 meses maravillosos.
      </p>
      {/* Placeholder content for the special page */}
      <div className="bg-card p-6 rounded-lg shadow-lg border border-accent/30 mb-8 w-full max-w-2xl">
        <p className="text-card-foreground">
            ¡Contenido especial próximamente! Imagina fotos, videos, o cualquier otra sorpresa aquí...
        </p>
        {/* Example: Add an image */}
        {/* <Image src="/path/to/your/special-image.jpg" alt="Surprise!" width={500} height={300} className="rounded-md mt-4" /> */}
      </div>
      <Link href="/" passHref>
        <Button variant="outline" className="text-accent border-accent hover:bg-accent/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la página principal
        </Button>
      </Link>
    </div>
  );
}
