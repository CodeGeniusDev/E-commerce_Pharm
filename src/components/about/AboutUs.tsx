import { motion } from "framer-motion";
import { Heart, Award, Users, Clock, Shield, Truck } from "lucide-react";

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

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const About = () => {
  const milestones = [
    {
      year: "2010",
      title: "Founded",
      description: "Started as a small local pharmacy",
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Opened multiple branches across Karachi",
    },
    {
      year: "2020",
      title: "Digital Launch",
      description: "Launched online platform for nationwide delivery",
    },
    {
      year: "2024",
      title: "Excellence",
      description: "Served over 10,000 happy customers",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Care First",
      description:
        "Your health and well-being are at the heart of everything we do",
      color: "text-destructive",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "100% genuine medicines from licensed manufacturers",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Personalized service and expert advice for every customer",
      color: "text-secondary",
    },
    {
      icon: Truck,
      title: "Quick Delivery",
      description: "Fast and reliable delivery to your doorstep",
      color: "text-accent",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-18 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-10 rounded-full"
          >
            <Award size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              15+ Years of Excellence
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6 text-center"
          >
            About <span className="text-primary">Rehmat Pharma</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-center"
          >
            Since 2010, Rehmat Pharma has been a trusted name in healthcare,
            combining traditional values with modern convenience to serve
            communities across Pakistan.
          </motion.p>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* About Content */}
            <motion.div variants={slideInLeftVariants} className="space-y-6">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Story
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Rehmat Pharma began as a small neighborhood pharmacy with a
                  simple mission: to provide genuine medicines and healthcare
                  products at affordable prices. Over the years, we've grown
                  into a comprehensive healthcare provider while maintaining our
                  commitment to quality and customer care.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we combine our extensive experience with modern
                  technology to offer you the convenience of online ordering
                  while maintaining the personal touch that has made us a
                  trusted name in healthcare for over a decade.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={slideInRightVariants}>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Our Journey
                </h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock size={20} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-sm font-bold text-primary">
                            {milestone.year}
                          </span>
                          <h4 className="font-semibold text-foreground">
                            {milestone.title}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-8">
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-foreground mb-8"
            >
              Our Core Values
            </motion.h3>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={scaleInVariants}
                  transition={{ duration: 0.2 }}
                  className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon size={24} className={value.color} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div variants={scaleInVariants} className="text-center mt-16">
            <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Experience the Rehmat Pharma Difference
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of satisfied customers who trust us for their
                healthcare needs. Quality medicines, expert advice, and
                convenient delivery - all just a click away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+923331304004"
                  className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Call Us Now
                </a>
                <a
                  href="/products"
                  className="btn-glass flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Browse Products
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
