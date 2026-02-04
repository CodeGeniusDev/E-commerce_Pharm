import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const Hero = () => {
  return (
    <section className="relative h-screen py-10 md:py-16 lg:py-20 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="section-container relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6"
          >
            <Shield size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Licensed & Verified Pharmacy</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
          >
            Your Health,{' '}
            <span className="text-primary">Our Priority</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Rehmat Pharma is committed to providing safe, genuine and affordable pharmaceutical products. Order medicines and healthcare products with doorstep delivery.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/products"
              className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Browse Products
              <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+923001234567"
              className="btn-glass flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Heart size={18} className="text-destructive" />
              Emergency Order
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 mt-12 md:mt-16"
          >
            <div className="glass-card p-4 md:p-6 rounded-2xl">
              <p className="text-2xl md:text-3xl font-bold text-primary">5000+</p>
              <p className="text-sm text-muted-foreground mt-1">Products</p>
            </div>
            <div className="glass-card p-4 md:p-6 rounded-2xl">
              <p className="text-2xl md:text-3xl font-bold text-secondary">10K+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
            </div>
            <div className="glass-card p-4 md:p-6 rounded-2xl">
              <p className="text-2xl md:text-3xl font-bold text-accent">24/7</p>
              <p className="text-sm text-muted-foreground mt-1">Support</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
