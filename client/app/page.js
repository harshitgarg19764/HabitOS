import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { HeatmapPreviewSection } from '../components/landing/HeatmapPreviewSection';
import { AiInsightsPreviewSection } from '../components/landing/AiInsightsPreviewSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { SocialProofSection } from '../components/landing/SocialProofSection';
import { CtaSection } from '../components/landing/CtaSection';
import { Footer } from '../components/layout/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <HeatmapPreviewSection />
      <AiInsightsPreviewSection />
      <TestimonialsSection />
      <SocialProofSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
