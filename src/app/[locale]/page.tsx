import React from 'react';

import BuyerBenefits from '../../components/ui/blocks/BuyerBenefits';
import Footer from '../../components/ui/blocks/Footer';
import Header from '../../components/ui/blocks/Header';
import HeroSection from '../../components/ui/blocks/HeroSection';
import HowItWorks from '../../components/ui/blocks/HowItWorks';
import Integrations from '../../components/ui/blocks/Integrations';
import KeyFeatures from '../../components/ui/blocks/KeyFeatures';
import Pricing from '../../components/ui/blocks/Pricing';
import { PageAnalytics } from '@/components/providers/PageAnalytics';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageAnalytics />
      <Header />
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <BuyerBenefits />
      <Integrations />
      {/* <SocialProof /> */}
      <Pricing />
      <Footer />
    </div>
  );
}
