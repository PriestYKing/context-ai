import { DotBackground } from "@/components/background";
import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/Navigation";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed dot background covering entire page */}
      <DotBackground />

      {/* Content on top of background */}
      <div className="relative z-10 p-8">
        {/* White Navigation Bar */}
        <div className="bg-white rounded-2xl shadow-sm mb-8 px-4">
          <NavigationBar />
        </div>

        {/* Hero Section */}
        <HeroSection />
      </div>
    </div>
  );
}
