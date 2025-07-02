import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Award, Heart, Truck, Shield, Users } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ProductCard from '../components/Product/ProductCard';
import Button from '../components/UI/Button';
import { getFeaturedProducts } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-wood-50 to-primary-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-charcoal-900 leading-tight">
                Taste the <span className="text-primary-600">Tradition</span>
              </h1>
              <p className="text-xl text-charcoal-700 mt-6 leading-relaxed">
                Handcrafted wooden kitchenware and home décor from the heart of Uttarakhand. 
                Each piece tells a story of sustainable craftsmanship and timeless beauty.
              </p>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-charcoal-700">Eco-Friendly</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <Award className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-charcoal-700">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-charcoal-700">Handcrafted</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/bulk-orders">B2B Orders</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Handcrafted wooden products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-charcoal-900 mb-4">
              Why Choose OMII WOODS?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
              We combine traditional craftsmanship with modern quality standards to bring you 
              the finest wooden products for your home and business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-wood-50 hover:bg-wood-100 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Leaf className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Sustainable Materials</h3>
              <p className="text-charcoal-600">
                Made from premium shisham, neem, and saal wood sourced responsibly from local forests.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-wood-50 hover:bg-wood-100 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Handcrafted Excellence</h3>
              <p className="text-charcoal-600">
                Each piece is carefully crafted by skilled artisans with decades of experience.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-wood-50 hover:bg-wood-100 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Quality Guarantee</h3>
              <p className="text-charcoal-600">
                Every product comes with our quality guarantee and comprehensive warranty.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-wood-50 hover:bg-wood-100 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Nationwide Delivery</h3>
              <p className="text-charcoal-600">
                Fast and secure delivery across India with real-time tracking.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-wood-50 hover:bg-wood-100 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">B2B Solutions</h3>
              <p className="text-charcoal-600">
                Special pricing and bulk order solutions for businesses and institutions.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-wood-50 hover:bg-wood-100 transition-colors group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Award Winning</h3>
              <p className="text-charcoal-600">
                Recognized for excellence in traditional craftsmanship and design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-wood-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-charcoal-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-charcoal-600">
              Discover our most popular handcrafted wooden products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Ready to Experience Traditional Craftsmanship?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen OMII WOODS for their 
            wooden kitchenware and home décor needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;