import { DotBackground } from "@/components/background";
import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/Navigation";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed dot background covering entire page */}
      <DotBackground />

      {/* Content on top of background */}
      <div className="relative z-10">
        {/* White Navigation Bar */}

        <NavigationBar />

        {/* Hero Section */}
        <HeroSection />
      </div>
    </div>
  );
}
