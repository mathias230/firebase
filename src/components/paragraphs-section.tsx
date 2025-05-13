import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea

// Sample paragraphs - replace with actual content
const paragraphs = [
  "Eres la mejor persona que he conocido en mi vida, siempre quise a alguien como tu y soy muy afortunado de tenerte a mi lado",
  "Desde que llegaste, mi vida se lleno de colores que no sabia que existian, tu sonrisa ilumina mis dias, tus palabras son un refugio",
  "Contigo he aprendido el verdadero significado de amar, entregar el corazon sin esperar nada a cambio, encontre la felicidad en ti y soy muy agradecido",
  "No hay distancia que pueda acabar con este amor, mi amor por ti tuvo un inicio pero espero nunca ver el final", // Updated text
];

export function ParagraphsSection() {
  return (
    <section id="paragraphs" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary-foreground mb-8 flex items-center justify-center gap-3">
          <Heart className="text-accent" size={32} />
          Palabras del Corazón
          <Heart className="text-accent" size={32} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {paragraphs.map((text, index) => (
            <Card key={index} className="bg-card shadow-lg border-accent/30 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <CardContent className="pt-6">
                <p className="text-lg text-card-foreground leading-relaxed italic">
                  {text} {/* Removed quotes as per previous edits, just displaying text directly */}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Large Textarea */}
        <Card className="bg-card shadow-lg border-accent/30 mt-6">
           <CardHeader>
             <CardTitle className="text-xl text-primary-foreground flex items-center gap-2">
                Algo mas que palabras
             </CardTitle>
           </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Escribe aquí tus pensamientos..."
              rows={40} // Adjust rows for desired height
              className="text-lg text-card-foreground leading-relaxed bg-input border-accent/50 p-4 rounded-md" // Added some styling
              defaultValue="Mejora este diseño por favor"
              readOnly // Make it read-only if it's just for display
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

