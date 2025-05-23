import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageSquareText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample paragraphs - replace with actual content
const paragraphs = [
  "Eres la mejor persona que he conocido en mi vida, siempre quise a alguien como tu y soy muy afortunado de tenerte a mi lado",
  "Desde que llegaste, mi vida se lleno de colores que no sabia que existian, tu sonrisa ilumina mis dias, tus palabras son un refugio",
  "Contigo he aprendido el verdadero significado de amar, entregar el corazon sin esperar nada a cambio, encontre la felicidad en ti y soy muy agradecido",
  "No hay distancia que pueda acabar con este amor, mi amor por ti tuvo un inicio pero espero nunca ver el final",
];

export function ParagraphsSection() {
  const longMessage = "Hola mi amor, mi niña bonita, hoy no es cualquier dia, hoy cumplimos 11 meses juntitos, y de verdad no tengo palabras para explicar lo muy afortunado que soy por tenerte en mi vida, quiero que sepas que eres lo mejor que me ha pasado en la vida, que eres una persona increible, estoy muy muy pero muy orgulloso de ti, de todo lo que haz logrado, creeme que pase lo que pase yo siempre siempre te apoyare en todos y cada uno de tus metas y sueños, aunque tus sueños me quiten prioridad y nos aleje aun mas, yo siempre siempre estare ahi para apoyarte pase lo que pase, estuve ahi en las buenas y en las malas cintigo, lo seguire haciendo hasta el final de los tiempos, creeme cuando te digo que nunca nunca habia amado tanto a alguien como lo hago contigo, nunca nunca crei que podia amar tanto a alguien hasta que te conoci, nunca pense que me podia enamorar tan perdidamente de alguien y con tantas ganas y emocion, hasta que te conoci, eres lo mejor mejor que me ha pasado en la vida y lo mejor que me habra pasado, te amo y te adoro demasiado mi princesita hermosa, de verdad eres increíble, cada parte de ti es un misterio que quiero descubrir, que se muchas veces hemos tenido problemas y hemos estado al borde de terminar todo, pero nunca nunca nos rendimos, y mira donde estamos ahora, a 1 mes de cumplir 1 año juntitos, y a la distancia mi amor, estando muy muy lejos hicimos algo que no mucha gente puede hacer, algo muy complicado, esto solo demuestra que la distancia no es nada si las 2 personas se aman con toda su alma y estarían dispuestas a darlo todo por cada uno, de verdad soy muy afortunado por tenerte a mi lado, eres simplemente hermosa e increíble mi amor, millón gracias por todito lo que haces por mi, por estar ahí en mis buenos malos y sobre todos peores momentos, esos momentos donde pareciera ya tocar fondo y no poder dar mas de mi mismo por todo el cansancio, de veras eres increíble y tienes una vibra muy hermosa, tu eres hermosa, tu eres tu y eres de las personas que mas me importan en esta vida, creeme que no me imagino una vida sin ti, se que antes no estaba contigo, pero simplemente ahora me acostumbre tanto a tenerte y estar contigo, depender de ti para absolutamente todo que ahora no me imagino si quiera 1 momento sin ti, sin tu amor y todas tus caricias, tu cariño, eres hermosa e impresionante, cada parte de ti es increíble mi amor, eternamente agradecido por todo lo que me has dado mi niña bonita muchas gracias por toditoooooooo, te amo y te adoro muchoooo mi preciosa, cada dia junto a ti es el mejor dia que puedo vivir, eres increíble, bonita y preciosa, nunca nunca me cansare de decirte lo mucho mucho que te amo y te adoro, lo mucho que me gustas, lo mucho que te adoro, y lo muy enamorado que este, aunque estes en otro país, en otra ciudad, hasta en otro planeta, yo siempre siempre estaré ahí para ti, desde el primer dia que te conocí, un 2024, hasta hoy dia un 2025, espero que duremos mucho mucho muchísimo mi niña bonita porque de verdad me haces muy muy feliz mi princesita, te amo y te adoro demasiado mi amorcito, FELICES 11 MESES MI CHINITA";

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
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Large Textarea Section - Enhanced Design */}
        <Card className="bg-gradient-to-br from-card via-background/50 to-secondary/30 shadow-2xl border-primary/20 mt-10 p-2 rounded-xl">
           <CardHeader className="pb-3 pt-4 px-4">
             <CardTitle className="text-2xl text-primary-foreground flex items-center gap-2 font-serif tracking-wider">
                <MessageSquareText className="text-accent size-7" />
                Algo mas que palabras
             </CardTitle>
           </CardHeader>
          <CardContent className="pt-0 px-1 pb-1 md:px-2 md:pb-2">
            <ScrollArea className="h-[500px] md:h-[600px] w-full rounded-lg border border-accent/30 shadow-inner bg-background/70 backdrop-blur-sm">
              <div className="p-4 md:p-6">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap font-normal" style={{fontFamily: "'Georgia', serif"}}>
                  {longMessage}
                </p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
