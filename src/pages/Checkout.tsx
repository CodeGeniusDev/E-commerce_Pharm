import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, X, FileText, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

// Validation schema
const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().regex(/^(\+92|0)?[0-9]{10}$/, 'Enter a valid Pakistani phone number'),
  address: z.string().trim().min(10, 'Please enter a complete address').max(500, 'Address is too long'),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

// Replace this with your WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '923331304004';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const requiresPrescription = items.some(item => item.product.requiresPrescription);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a JPG, PNG, WebP or PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setPrescriptionFile(file);
    }
  };

  const removeFile = () => {
    setPrescriptionFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadPrescription = async (): Promise<string | null> => {
    if (!prescriptionFile) return null;

    const fileExt = prescriptionFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('prescriptions')
      .upload(filePath, prescriptionFile);

    if (error) {
      console.error('Upload error:', error);
      throw new Error('Failed to upload prescription');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('prescriptions')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const generateWhatsAppMessage = (prescriptionUrl: string | null) => {
    let message = `🏥 *NEW ORDER - Rehmat Pharma*\n\n`;
    message += `📋 *Customer Details*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n`;
    if (formData.notes) {
      message += `Notes: ${formData.notes}\n`;
    }
    message += `\n`;
    message += `🛒 *Order Items*\n`;
    message += `─────────────────\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Qty: ${item.quantity} × Rs. ${item.product.price.toLocaleString()} = Rs. ${(item.quantity * item.product.price).toLocaleString()}\n`;
      if (item.product.requiresPrescription) {
        message += `   ⚠️ Prescription Required\n`;
      }
    });

    message += `─────────────────\n`;
    message += `💰 *Total: Rs. ${getCartTotal().toLocaleString()}*\n`;

    if (prescriptionUrl) {
      message += `\n📄 *Prescription:*\n${prescriptionUrl}\n`;
    }

    message += `\n✅ Please confirm this order. Thank you!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please fix the form errors');
      return;
    }

    // Check prescription requirement
    if (requiresPrescription && !prescriptionFile) {
      toast.error('Please upload a prescription for prescription items');
      return;
    }

    setIsUploading(true);

    try {
      // Upload prescription if provided
      const prescriptionUrl = await uploadPrescription();

      // Generate WhatsApp message
      const message = generateWhatsAppMessage(prescriptionUrl);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

      // Clear cart
      clearCart();

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Show success and redirect
      toast.success('Order prepared! Redirecting to WhatsApp...');
      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-secondary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">No items to checkout</h1>
            <p className="text-muted-foreground mb-6">Add products to your cart first</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={18} />
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-foreground">Checkout</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Details */}
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Customer Details</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`glass-input ${errors.name ? 'border-destructive ring-destructive/30' : ''}`}
                        placeholder="Enter your full name"
                        required
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`glass-input ${errors.phone ? 'border-destructive ring-destructive/30' : ''}`}
                        placeholder="03001234567"
                        required
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`glass-input resize-none ${errors.address ? 'border-destructive ring-destructive/30' : ''}`}
                        placeholder="Enter your complete delivery address"
                        required
                      />
                      {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={2}
                        className="glass-input resize-none"
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>
                </div>

                {/* Prescription Upload */}
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Prescription Upload
                    {requiresPrescription && <span className="text-destructive ml-1">*</span>}
                  </h2>
                  {requiresPrescription && (
                    <p className="text-accent text-sm mb-4">
                      ⚠️ Your cart contains prescription items. Please upload a valid prescription.
                    </p>
                  )}

                  {!prescriptionFile ? (
                    <div
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={40} className="mx-auto text-muted-foreground mb-4" />
                      <p className="font-medium text-foreground mb-1">
                        Click to upload prescription
                      </p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG, WebP or PDF (max 5MB)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        aria-label="Upload prescription file"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-xl">
                      <FileText size={24} className="text-secondary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{prescriptionFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(prescriptionFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove file"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                    {items.map(item => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × Rs. {item.product.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          Rs. {(item.quantity * item.product.price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>Rs. {getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span className="text-secondary">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-foreground pt-2">
                      <span>Total</span>
                      <span>Rs. {getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="btn-secondary w-full flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MessageCircle size={18} />
                    {isUploading ? 'Processing...' : 'Send Order via WhatsApp'}
                  </button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing this order, you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
