import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GetInTouch from "@/components/home/GetInTouch";
import AboutUs from "@/components/about/AboutUs";
import TrustBadges from "@/components/home/TrustBadges";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AboutUs />
        <TrustBadges />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
};

export default About;
