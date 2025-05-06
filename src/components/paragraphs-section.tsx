import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea

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

        {/* Large Textarea */}
        <Card className="bg-card shadow-lg border-accent/30 mt-6">
          <CardContent>
            <Textarea
              placeholder="Escribe aquí tus pensamientos..."
              rows={40} // Adjust rows for desired height
              className="text-lg text-card-foreground leading-relaxed"
              defaultValue="Hola mi amor, mi niña bonita, hoy no es cualquier dia, hoy cumplimos 11 meses juntitos, y de verdad no tengo palabras para explicar lo muy afortunado que soy por tenerte en mi vida, quiero que sepas que eres lo mejor que me ha pasado en la vida, que eres una persona increible, estoy muy muy pero muy orgulloso de ti, de todo lo que haz logrado, creeme que pase lo que pase yo siempre siempre te apoyare en todos y cada uno de tus metas y sueños, aunque tus sueños me quiten prioridad y nos aleje aun mas, yo siempre siempre estare ahi para apoyarte pase lo que pase, estuve ahi en las buenas y en las malas cintigo, lo seguire haciendo hasta el final de los tiempos, creeme cuando te digo que nunca nunca habia amado tanto a alguien como lo hago contigo, nunca nunca crei que podia amar tanto a alguien hasta que te conoci, nunca pense que me podia enamorar tan perdidamente de alguien y con tantas ganas y emocion, hasta que te conoci, eres lo mejor mejor que me ha pasado en la vida y lo mejor que me habra pasado, te amo y te adoro demasiado mi princesita hermosa"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
