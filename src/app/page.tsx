import { Hero } from '@/components/Hero';
import { Ticker } from '@/components/Ticker';
import { IntroSection } from '@/components/IntroSection';
import { ProcessSection } from '@/components/ProcessSection';
import { ServicesSection } from '@/components/ServicesSection';
// Sections below are built and ready — uncomment when content is available
// import { EstimateTeaser } from '@/components/EstimateTeaser';
// import { PortfolioStrip } from '@/components/PortfolioStrip';
// import { TestimonialsSection } from '@/components/TestimonialsSection';
import { AboutSection } from '@/components/AboutSection';
import { ServiceAreas } from '@/components/ServiceAreas';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <IntroSection />
      <ProcessSection />
      <ServicesSection />
      <AboutSection />
      <ServiceAreas />
      <FAQSection />
      <CTASection />
    </>
  );
}
