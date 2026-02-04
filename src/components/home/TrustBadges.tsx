import { Shield, CheckCircle, Truck, Stethoscope } from "lucide-react";
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

const trustBadges = [
  {
    icon: Shield,
    text: "Licensed Pharmacy",
    color: "text-primary",
  },
  {
    icon: CheckCircle,
    text: "100% Genuine Medicines",
    color: "text-secondary",
  },
  {
    icon: Truck,
    text: "Fast Delivery",
    color: "text-accent",
  },
  {
    icon: Stethoscope,
    text: "Doctor Verified Products",
    color: "text-primary",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/50">
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.text}
              variants={itemVariants}
              className="trust-badge"
            >
              <badge.icon size={20} className={badge.color} />
              <span className="text-sm md:text-base">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
