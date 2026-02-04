import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactUs from "@/components/contact/ContactUs";
import TrustBadges from "@/components/home/TrustBadges";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ContactUs />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
