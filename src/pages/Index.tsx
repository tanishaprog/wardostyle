import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { StylingDemo } from "@/components/sections/StylingDemo";
import { ClosetDemo } from "@/components/sections/ClosetDemo";
import { AvatarDemo } from "@/components/sections/AvatarDemo";
import { StyleDNA } from "@/components/sections/StyleDNA";
import { WhyWardo } from "@/components/sections/WhyWardo";
import { WaitlistCTA } from "@/components/sections/WaitlistCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      
      <main>
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
