import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin, 
  TreePine,
  Leaf,
  Award,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-2">Stay Connected</h3>
            <p className="text-primary-100 mb-6">
              Get updates on new products and exclusive offers
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-charcoal-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-wood-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <TreePine className="h-8 w-8 text-primary-400" />
              <div className="flex flex-col">
                <h1 className="text-xl font-display font-bold">OMII WOODS</h1>
                <span className="text-xs text-wood-300 -mt-1">Taste the Tradition</span>
              </div>
            </Link>
            <p className="text-charcoal-300 text-sm leading-relaxed">
              Handcrafted wooden kitchenware and home décor from the heart of Uttarakhand. 
              Sustainable, premium quality products made with traditional craftsmanship.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Leaf className="h-4 w-4 text-primary-400" />
                <span className="text-xs text-charcoal-300">Eco-Friendly</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4 text-primary-400" />
                <span className="text-xs text-charcoal-300">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-primary-400" />
                <span className="text-xs text-charcoal-300">Handcrafted</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Dinner Sets" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Dinner Sets
                </Link>
              </li>
              <li>
                <Link to="/products?category=Serving Trays" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Serving Trays
                </Link>
              </li>
              <li>
                <Link to="/products?category=Storage Boxes" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Storage Boxes
                </Link>
              </li>
              <li>
                <Link to="/products?category=Wooden Toys" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Wooden Toys
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Bulk Orders (B2B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  Product Care Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-charcoal-300 hover:text-primary-400 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-charcoal-300">
                  <p>OMII WOODS</p>
                  <p>Haridwar, Uttarakhand</p>
                  <p>India - 249407</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-charcoal-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-charcoal-300">info@omiiwoods.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://instagram.com/omiiwoods" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-charcoal-700 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/omiiwoods" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-charcoal-700 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-charcoal-900 border-t border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-charcoal-400">
              <p>&copy; 2025 OMII WOODS. All rights reserved.</p>
              <p>CIN: U31001UT2025PTC018537</p>
              <p>GSTIN: 05AAECO6026D1ZU</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-charcoal-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;