import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';

export function MusicSection() {
  // Placeholder for an embedded music player (e.g., Spotify, SoundCloud, YouTube Music)
  // Replace the div below with the actual embed code from the music service.
  const embedCode = `
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/647x1NQZFuGixnJqUFMnGS?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  `; // Updated Spotify Playlist

  return (
    <section id="music" className="py-12 md:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-secondary-foreground mb-8 flex items-center justify-center gap-3">
          <Music className="text-accent" size={32} />
          Nuestra Canción
          <Music className="text-accent" size={32} />
        </h2>
        <Card className="bg-card shadow-lg overflow-hidden border-primary/30">
          <CardContent className="p-4 md:p-6">
            {/* Render the embed code safely */}
            <div
              className="aspect-video md:aspect-auto [&>iframe]:w-full [&>iframe]:min-h-[352px]" // Responsive iframe container
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
            {/* Fallback text if embed fails or is not provided */}
            {/* <p className="text-muted-foreground text-center">Music player will appear here.</p> */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
