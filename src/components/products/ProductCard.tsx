import { Link } from 'react-router-dom';
import { ShoppingCart, FileText } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group glass-card-hover rounded-2xl overflow-hidden block"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />
        {product.requiresPrescription && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
            <FileText size={12} />
            Prescription
          </div>
        )}
        {product.stock < 20 && (
          <div className="absolute top-3 right-3 bg-destructive/90 text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-lg">
            Low Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs font-medium text-primary mb-1">
          {product.category}
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-lg font-bold text-foreground">
              Rs. {product.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus:outline-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
