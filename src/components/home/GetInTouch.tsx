import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const GetInTouch = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-18 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center justify-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-10 text-center"
          >
            <Phone size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">
              Get in Touch
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6 text-center"
          >
            We're Here to <span className="text-primary">Help You</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-center"
          >
            Have questions about our products or need assistance with your
            order? Our friendly team is ready to help you with all your
            pharmaceutical needs.
          </motion.p>

          {/* Contact Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {/* Phone */}
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                +92 333 130 4004
              </p>
              <a
                href="tel:+923331304004"
                className="text-primary text-sm font-medium hover:underline"
              >
                Call Now
              </a>
            </div>

            {/* Email */}
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={20} className="text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                info@rehmatpharma.com
              </p>
              <a
                href="mailto:info@rehmatpharma.com"
                className="text-secondary text-sm font-medium hover:underline"
              >
                Send Email
              </a>
            </div>

            {/* Location */}
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={20} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Main Branch, Karachi
              </p>
              <a
                href="#"
                className="text-accent text-sm font-medium hover:underline"
              >
                Get Directions
              </a>
            </div>

            {/* Hours */}
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Mon-Sat: 9AM-10PM
              </p>
              <span className="text-primary text-sm font-medium">
                24/7 Emergency
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center gap-2"
            >
              Browse Products
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInTouch;
