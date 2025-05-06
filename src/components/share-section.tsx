"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast"; // Assuming useToast hook exists
import { useRouter } from 'next/navigation';

// Simple SVG Icons for social media (replace with lucide-react if available and suitable)
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const WhatsAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;

const targetDate = new Date('2025-06-19T07:00:00'); // June 19, 2025 7:00 AM


export function ShareSection() {
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');
  const [pageTitle] = useState('Amor Eterno - Una página especial'); // Or fetch dynamically if needed
  const [countdown, setCountdown] = useState(calculateTimeRemaining());
  const [isUnlocked, setIsUnlocked] = useState(countdown.total <= 0);
  const router = useRouter();



  useEffect(() => {
    // Ensure this runs only on the client
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isUnlocked) {
      interval = setInterval(() => {
        const newCountdown = calculateTimeRemaining();
        setCountdown(newCountdown);
        if (newCountdown.total <= 0) {
          setIsUnlocked(true);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isUnlocked]);

  function calculateTimeRemaining() {
    const now = new Date();
    let difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        total: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * (1000 * 60);

    const seconds = Math.floor(difference / 1000);

    return {
      total: difference,
      days,
      hours,
      minutes,
      seconds,
    };
  }


  const copyToClipboard = () => {
    if (!pageUrl) return;
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast({
        title: "Enlace Copiado",
        description: "¡El enlace a esta página ha sido copiado!",
        variant: "default",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace.",
        variant: "destructive",
      });
    });
  };

  const shareOptions = [
    { name: 'Twitter', icon: <TwitterIcon />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}` },
    { name: 'Facebook', icon: <FacebookIcon />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
    { name: 'WhatsApp', icon: <WhatsAppIcon />, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}` },
  ];

    const navigateToPage = () => {
        router.push('/otra-pagina'); // Replace '/otra-pagina' with the actual path
    };

  return (
    <section id="share" className="py-8 bg-background">
      <div className="container mx-auto px-4 text-center">
      {isUnlocked ? (
            <Button variant="outline" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-md" onClick={navigateToPage}>
                Ir a la página especial
            </Button>
        ) : (
            <div>
                <p>Disponible en:</p>
                <p>
                    {countdown.days} días, {countdown.hours} horas, {countdown.minutes} minutos, {countdown.seconds} segundos
                </p>
            </div>
        )}
        <Button variant="outline" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-md" onClick={navigateToPage} disabled={!isUnlocked}>
              0.12
        </Button>
         {/*<DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button variant="outline" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-md" disabled={!isUnlocked}>
              <Share2 className="mr-2" />
              Compartir Amor
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="bg-popover border-accent/50">
             {shareOptions.map(option => (
              <DropdownMenuItem key={option.name} asChild>
                <a href={option.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                  {option.icon}
                  <span>{option.name}</span>
                </a>
              </DropdownMenuItem>
            ))}
             <DropdownMenuItem onSelect={copyToClipboard} className="flex items-center gap-2 cursor-pointer">
                <Copy />
                <span>Copiar Enlace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>*/}
      </div>
    </section>
  );
}


