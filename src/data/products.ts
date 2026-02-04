export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  price: number;
  stock: number;
  imageUrl: string;
  requiresPrescription: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    slug: "paracetamol-500mg",
    category: "Pain Relief",
    shortDescription: "Fast-acting pain relief and fever reducer. Safe for adults and children over 12.",
    price: 45,
    stock: 150,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "2",
    name: "Vitamin C 1000mg",
    slug: "vitamin-c-1000mg",
    category: "Vitamins & Supplements",
    shortDescription: "High-potency immune support with natural citrus bioflavonoids. 30 tablets.",
    price: 320,
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "3",
    name: "Blood Pressure Monitor",
    slug: "blood-pressure-monitor",
    category: "Medical Equipment",
    shortDescription: "Digital automatic blood pressure monitor with memory function. Accurate readings.",
    price: 2499,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "4",
    name: "Amoxicillin 500mg",
    slug: "amoxicillin-500mg",
    category: "Antibiotics",
    shortDescription: "Broad-spectrum antibiotic for bacterial infections. Prescription required.",
    price: 185,
    stock: 80,
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
    requiresPrescription: true
  },
  {
    id: "5",
    name: "Digital Thermometer",
    slug: "digital-thermometer",
    category: "Medical Equipment",
    shortDescription: "Fast and accurate digital thermometer with fever alert. Waterproof design.",
    price: 299,
    stock: 120,
    imageUrl: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "6",
    name: "Multivitamin Complex",
    slug: "multivitamin-complex",
    category: "Vitamins & Supplements",
    shortDescription: "Complete daily nutrition with 23 essential vitamins and minerals. 60 tablets.",
    price: 450,
    stock: 175,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "7",
    name: "First Aid Kit",
    slug: "first-aid-kit",
    category: "Healthcare",
    shortDescription: "Comprehensive first aid kit with 100+ items. Perfect for home and travel.",
    price: 899,
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "8",
    name: "Insulin Glargine",
    slug: "insulin-glargine",
    category: "Diabetes Care",
    shortDescription: "Long-acting insulin for diabetes management. Prescription required.",
    price: 1250,
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1593491034932-3bde2c81f753?w=400&h=400&fit=crop",
    requiresPrescription: true
  },
  {
    id: "9",
    name: "Pulse Oximeter",
    slug: "pulse-oximeter",
    category: "Medical Equipment",
    shortDescription: "Fingertip pulse oximeter for SpO2 and heart rate monitoring. LED display.",
    price: 599,
    stock: 90,
    imageUrl: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "10",
    name: "Omega-3 Fish Oil",
    slug: "omega-3-fish-oil",
    category: "Vitamins & Supplements",
    shortDescription: "Pure fish oil capsules for heart and brain health. 120 softgels.",
    price: 550,
    stock: 140,
    imageUrl: "https://images.unsplash.com/photo-1577401132921-cb39bb0adcff?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "11",
    name: "Nebulizer Machine",
    slug: "nebulizer-machine",
    category: "Medical Equipment",
    shortDescription: "Compact nebulizer for respiratory therapy. Quiet operation, portable design.",
    price: 1850,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
    requiresPrescription: false
  },
  {
    id: "12",
    name: "Cetirizine 10mg",
    slug: "cetirizine-10mg",
    category: "Allergy Relief",
    shortDescription: "24-hour allergy relief from hay fever, hives, and allergic reactions. 30 tablets.",
    price: 95,
    stock: 200,
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    requiresPrescription: false
  }
];

export const categories = [
  "All",
  "Pain Relief",
  "Vitamins & Supplements",
  "Medical Equipment",
  "Antibiotics",
  "Healthcare",
  "Diabetes Care",
  "Allergy Relief"
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};
