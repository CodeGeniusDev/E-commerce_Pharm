import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h3 className="text-xl font-bold">Rehmat Pharma</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Rehmat Pharma is committed to providing safe, genuine and affordable pharmaceutical products. Your health is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone size={18} />
                <span>+92 333 1304004</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail size={18} />
                <span>info@rehmatpharma.com</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>123 Healthcare Street, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Business Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Clock size={18} />
                <div>
                  <p className="font-medium text-white">Mon - Sat</p>
                  <p className="text-sm">9:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Clock size={18} />
                <div>
                  <p className="font-medium text-white">Sunday</p>
                  <p className="text-sm">10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {new Date().getFullYear()} Rehmat Pharma. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-primary-foreground/70 text-sm">Licensed Pharmacy</span>
              <span className="text-primary-foreground/70 text-sm">Genuine Products</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
