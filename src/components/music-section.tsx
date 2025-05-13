
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';

// const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/embed/playlist/37i9dQZF1DWXNFSTtym834?utm_source=generator";

export function MusicSection() {
  const embedHtml = `
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2MZgRLYxxS71IEZelflSxH?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
