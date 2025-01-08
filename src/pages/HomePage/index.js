import React from "react";

import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "../../components/Layout/Footer";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default HomePage;
