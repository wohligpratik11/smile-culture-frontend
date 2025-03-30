
import HeroSection from '../../../src/components/layout/HeroSection';
import TrustIndicators from '../../../src/components/layout/TrustIndicators';
import WorkSection from '../../../src/components/layout/WorksSection';
import DoctorSection from '../../../src/components/layout/DoctorSection';
import PricingSection from '../../../src/components/layout/PricingSection';
import ChooseUSSection from '../../../src/components/layout/ChooseUsSection';
import BookingSection from '../../../src/components/layout/BookingSection';
// import TestimonialsSection from '../../../src/components/layout/TestimonialsSection';

const Home = () => {


  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <WorkSection />
      <DoctorSection />
      <PricingSection />
      <BookingSection />
      <ChooseUSSection />
      {/* <TestimonialsSection /> */}
    </>
  );
};

export default Home;

