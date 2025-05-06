import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

// Sample paragraphs - replace with actual content
const paragraphs = [
  "Eres la melodía que mi corazón siempre quiso escuchar, la luz que ilumina mis días más oscuros y el sueño del que nunca quiero despertar. Cada momento contigo es un tesoro.",
  "Desde que llegaste, mi mundo se llenó de colores que no sabía que existían. Tu sonrisa es mi sol, tus abrazos mi refugio. Te amo más de lo que las palabras pueden expresar.",
  "Contigo he aprendido lo que significa amar de verdad, entregar el corazón sin reservas y encontrar la felicidad en las cosas más simples. Eres mi todo.",
  "No hay distancia que pueda apagar este amor, ni tiempo que pueda disminuirlo. Eres mi principio y mi fin, mi amor eterno.",
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
                  "{text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
