import { Header } from '@/components/header';
import { ParagraphsSection } from '@/components/paragraphs-section';
// import { MusicSection } from '@/components/music-section'; // Removed import
import { AnimationsSection } from '@/components/animations-section';
import { ShareSection } from '@/components/share-section';
import { Footer } from '@/components/footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimationsSection /> {/* Background animations */}
      <Header />
      <main className="flex-grow relative z-10"> {/* Content needs higher z-index */}
        {/* Optional Hero Image */}
        <section className="relative h-64 md:h-96 w-full mb-12 md:mb-16">
           <Image
            src="https://picsum.photos/1200/400" // Placeholder Image
            alt="Romantic background"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
            data-ai-hint="couple love" // AI Hint for image search
            priority // Load hero image faster
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" /> {/* Fade effect */}
        </section>

        <ParagraphsSection />
        {/* <MusicSection /> // Removed usage */}
        <ShareSection />
      </main>
      <Footer />
    </div>
  );
}
