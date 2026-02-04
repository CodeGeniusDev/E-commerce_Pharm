import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";
import TrustBadges from "@/components/home/TrustBadges";
import GetInTouch from "@/components/home/GetInTouch";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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

  const filteredProducts = getProductsByCategory(selectedCategory).filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="section-container mb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Products</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Products
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} products available
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input pl-11"
                aria-label="Search products"
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="sticky top-24 z-10 rounded-2xl glass-card flex items-center gap-2 mb-8 overflow-x-auto p-4 backdrop-blur-lg bg-slate-300/20 scrollbar-hide">
            <Filter size={33} className="text-muted-foreground mr-2 bg-inherit border border-collapse p-2 rounded-full z-10 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all outline-none ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "glass-card hover:bg-white/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="glass-card inline-flex p-8 rounded-2xl">
                <div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    No products found
                  </p>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <TrustBadges />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
