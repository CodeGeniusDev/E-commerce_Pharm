import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutUs from '@/components/about/AboutUs';
import GetInTouch from '@/components/home/GetInTouch';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <FeaturedProducts />
        <AboutUs />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
