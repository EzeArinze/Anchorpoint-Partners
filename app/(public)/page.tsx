import HeroSection from "./_components/hero-section";
import TeamSection from "./_components/our-team";
import StatsSection from "./_components/stats";
import WallOfLoveSection from "./_components/testimonials";
import WhyInvest from "./_components/why-invest";
import { InvestmentProducts } from "./_components/investment-products";
import { Insight } from "./_components/insight";
import { InvestmentPlans } from "./_components/investment-plan";

export default function PublicRoute() {
  return (
    <>
      <HeroSection />
      <WhyInvest />
      <StatsSection />
      <InvestmentProducts />
      <WallOfLoveSection />
      <InvestmentPlans />
      <TeamSection />
      <Insight />
    </>
  );
}
