import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, FileText, Minus, Plus, Package, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

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

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 my-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.requiresPrescription && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <FileText size={16} />
                    Prescription Required
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-medium">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              <p className="text-lg text-muted-foreground">
                {product.shortDescription}
              </p>

              {/* Price */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/ unit</span>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <Package size={18} className="text-secondary" />
                  <span className={`text-sm font-medium ${product.stock > 20 ? 'text-secondary' : 'text-accent'}`}>
                    {product.stock > 20 ? 'In Stock' : `Only ${product.stock} left`}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center glass-card rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted/50 rounded-l-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-muted/50 rounded-r-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={handleAddToCart} className="btn-glass flex items-center justify-center gap-2 flex-1">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="btn-secondary flex items-center justify-center gap-2 flex-1">
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield size={16} className="text-primary" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package size={16} className="text-secondary" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-foreground">
                  Related Products
                </h2>
              </motion.div>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {relatedProducts.map(product => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
