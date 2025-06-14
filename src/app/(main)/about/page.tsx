import { 
  AboutHero, 
  AboutMission, 
  AboutFeatures, 
  AboutStats, 
  AboutTestimonials, 
  AboutCTA 
} from "@/components/about";

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white min-h-screen">
      {/* Hero Section */}
      <AboutHero />
      
      {/* Mission & Vision */}
      <AboutMission />
      
      {/* Platform Statistics */}
      <AboutStats />
      
      {/* Key Features */}
      <AboutFeatures />
      
      {/* Testimonials */}
      <AboutTestimonials />
      
      {/* Call to Action */}
      <AboutCTA />
    </div>
  );
};

export default AboutPage;
