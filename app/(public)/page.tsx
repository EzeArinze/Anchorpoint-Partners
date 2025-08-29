import StatsSection from "./_components/stats";
import WallOfLoveSection from "./_components/testimonials";
import { CompanyOffers } from "./_components/why-invest";
import HeroSection from "./_components/hero-section";
import { InvestmentPackages } from "./_components/investment-products";
import { InvestmentPackagesPlans } from "./_components/investment-plan";
import { CallToAction } from "./_components/call-to-action";
import MarketInsightsSection from "./_components/market-insight";
import HowItWorks from "./_components/how-it-works";
import { VisionMissionSection } from "./_components/vision-mission-section";

export default function PublicRoute() {
  return (
    <>
      <HeroSection />
      <CompanyOffers />
      <StatsSection />
      <InvestmentPackages />
      <WallOfLoveSection />
      <InvestmentPackagesPlans />
      <HowItWorks />
      <VisionMissionSection />
      <MarketInsightsSection />
      <CallToAction />
    </>
  );
}
