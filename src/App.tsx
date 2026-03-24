import { Particles } from "@/components/ui/particles";
import { MenuContainer } from "@/components/ui/fluid-menu";
import { Component as ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { ImageGallery } from "@/components/ui/image-gallery";
import { MorphingText } from "@/components/ui/morphing-text";
import { Menu, Home, Palette, User, Mail } from "lucide-react";

import artistImage from "@/assets/artist.jpg";

function App() {
  const heroTexts = [
    "Hello",
    "I'm Liebiha Slava",
    "Oil Painter from Ukraine"
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-serif selection:bg-neutral-200">
      {/* Background Particles */}
      <Particles
        className="fixed inset-0 pointer-events-none z-0"
        quantity={100}
        ease={80}
        color="#000000"
        size={0.6}
        refresh
      />

      {/* Navigation (Fluid Menu) */}
      <div className="fixed top-6 right-6 z-50">
        <MenuContainer>
          {/* Trigger Item */}
          <div className="flex items-center justify-center h-full w-full">
            <Menu className="w-5 h-5 md:w-6 md:h-6 text-neutral-800" />
          </div>

          {/* Menu Items */}
          <a href="#home" className="flex flex-col items-center justify-center h-full w-full text-neutral-800 hover:text-black transition-colors">
            <Home className="w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1" />
            <span className="text-[8px] md:text-[10px] font-sans font-bold uppercase tracking-wider">Home</span>
          </a>

          <a href="#works" className="flex flex-col items-center justify-center h-full w-full text-neutral-800 hover:text-black transition-colors">
            <Palette className="w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1" />
            <span className="text-[8px] md:text-[10px] font-sans font-bold uppercase tracking-wider">Works</span>
          </a>

          <a href="#bio" className="flex flex-col items-center justify-center h-full w-full text-neutral-800 hover:text-black transition-colors">
            <User className="w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1" />
            <span className="text-[8px] md:text-[10px] font-sans font-bold uppercase tracking-wider">Bio</span>
          </a>

          <a href="#contact" className="flex flex-col items-center justify-center h-full w-full text-neutral-800 hover:text-black transition-colors">
            <Mail className="w-4 h-4 md:w-5 md:h-5 mb-0.5 md:mb-1" />
            <span className="text-[8px] md:text-[10px] font-sans font-bold uppercase tracking-wider">Contact</span>
          </a>
        </MenuContainer>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center gap-8 py-20 relative">
          <div className="w-full z-20 px-4">
            <MorphingText texts={heroTexts} className="text-neutral-900 font-bold whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight" />
          </div>
          <div className="w-full z-10">
            <ImageAutoSlider />
          </div>
        </section>

        {/* Gallery Section */}
        <section id="works" className="py-24 md:py-32 bg-transparent">
          <div className="container mx-auto px-4 mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-neutral-900 mb-6">
              Selected Artworks
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-sans text-sm md:text-base tracking-widest uppercase">
              Oil on Canvas
            </p>
          </div>
          <ImageGallery />
        </section>

        {/* Bio Section */}
        <section id="bio" className="py-32 bg-transparent text-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-12">The Artist</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center text-left">
                <div className="aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden">
                  <img
                    src={artistImage}
                    alt="Slava Lebiga working in studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6 text-neutral-600 font-sans leading-relaxed text-lg font-light">
                  <p>
                    Studied at the Republican Secondary School of Art named after T.G. Shevchenko. From 1987 to 1993 studied at the National Academy of Arts. In 1987 received a diploma in monumental painting from the Ukrainian Academy of Arts.
                  </p>
                  <p>
                    Participant of many exhibitions in Ukraine and Europe. Member of the Union of Artists of Ukraine since 2000.
                  </p>
                  <p>
                    From 2014 to 2017 made an iconostasis in Nativity of the Holy Mother of God Ukrainian Church.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 bg-transparent text-center">
          <div className="container mx-auto px-4">
            <a href="mailto:contact@slavalebiga.com" className="text-lg sm:text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-neutral-900 hover:text-neutral-500 transition-all duration-300">
              contact@slavalebiga.com
            </a>
          </div>
        </section>

        <footer className="py-12 text-center text-neutral-300 text-[10px] font-sans uppercase tracking-[0.2em] bg-transparent">
          © {new Date().getFullYear()} Liebiha Slava. All Rights Reserved.
        </footer>
      </main>
    </div >
  );
}

export default App;
