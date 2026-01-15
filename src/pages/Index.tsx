import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { StylingDemo } from "@/components/sections/StylingDemo";
import { ClosetDemo } from "@/components/sections/ClosetDemo";
import { AvatarDemo } from "@/components/sections/AvatarDemo";
import { StyleDNA } from "@/components/sections/StyleDNA";
import { WhyWardo } from "@/components/sections/WhyWardo";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ParticleField } from "@/components/ParticleField";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden cursor-none">
      <CustomCursor />
      <ParticleField count={40} className="fixed inset-0 z-0" />
      
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        
        <div id="styling">
          <StylingDemo />
        </div>
        
        <div id="closet">
          <ClosetDemo />
        </div>
        
        <div id="avatar">
          <AvatarDemo />
        </div>
        
        <div id="style-dna">
          <StyleDNA />
        </div>
        
        <div id="why">
          <WhyWardo />
        </div>
        
        <div id="waitlist">
          <WaitlistCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
