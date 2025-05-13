
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';

const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/embed/playlist/647x1NQZFuGixnJqUFMnGS?utm_source=generator&theme=0"; // Using a theme a
// The specific pt parameter seems to be session/user specific for Spotify and might not be needed for general embedding.
// If a specific variant like si=0222716f1fac4735&pt=586934f1300914a36bf9be43130c0fba is strictly needed and works universally, it can be used.
// For simplicity and general use, the base embed URL is often sufficient.

export function MusicSection() {
  const embedHtml = `
    <iframe style="border-radius:12px" src="${SPOTIFY_PLAYLIST_URL}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  `;

  return (
    <section id="music" className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-secondary-foreground mb-8 flex items-center justify-center gap-3">
          <Music className="text-accent" size={32} />
          MUSICA
          <Music className="text-accent" size={32} />
        </h2>
        <Card className="bg-card shadow-lg overflow-hidden border-primary/30 max-w-2xl mx-auto">
          <CardContent className="p-4 md:p-6">
            <div
              className="aspect-video md:aspect-auto [&>iframe]:w-full [&>iframe]:min-h-[352px]"
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
