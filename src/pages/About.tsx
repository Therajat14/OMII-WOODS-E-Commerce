import React from 'react';
import { Award, Users, Leaf, Heart } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-6">
            About OMII WOODS
          </h1>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            Crafting tradition, sustaining nature. We bring you the finest handcrafted wooden 
            kitchenware and home décor from the heart of Uttarakhand.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-charcoal-700">
              <p>
                Founded on January 29, 2025, by Ms. Swati Choudhary and Mr. Vibhu Chaudhary, 
                OMII WOODS was born from a passion for preserving traditional craftsmanship 
                while promoting sustainable living.
              </p>
              <p>
                Based in the beautiful city of Haridwar, Uttarakhand, we work with skilled 
                artisans who have been perfecting their craft for generations. Each piece 
                we create tells a story of heritage, sustainability, and exceptional quality.
              </p>
              <p>
                What started as a B2B venture has grown into a comprehensive platform serving 
                both businesses and individual customers who appreciate the beauty and 
                functionality of handcrafted wooden products.
              </p>
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800" 
              alt="Craftsman at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Handcrafted Excellence</h3>
              <p className="text-charcoal-600">
                Every piece is carefully crafted by skilled artisans with decades of experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Sustainability</h3>
              <p className="text-charcoal-600">
                We use responsibly sourced wood and eco-friendly processes in all our products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Quality Assurance</h3>
              <p className="text-charcoal-600">
                Rigorous quality checks ensure every product meets our high standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Community Support</h3>
              <p className="text-charcoal-600">
                We support local artisans and contribute to the growth of traditional crafts.
              </p>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-wood-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-8">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 mb-2">Founded</h3>
              <p className="text-charcoal-600">January 29, 2025</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 mb-2">Team Size</h3>
              <p className="text-charcoal-600">20-50 Employees</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 mb-2">Location</h3>
              <p className="text-charcoal-600">Haridwar, Uttarakhand</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 mb-2">CIN</h3>
              <p className="text-charcoal-600">U31001UT2025PTC018537</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 mb-2">GSTIN</h3>
              <p className="text-charcoal-600">05AAECO6026D1ZU</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 mb-2">Specialization</h3>
              <p className="text-charcoal-600">Wooden Kitchenware & Home Décor</p>
            </div>
          </div>
        </div>

        {/* Materials Section */}
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
            Premium Materials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Shisham Wood</h3>
              <p className="text-charcoal-600">
                Known for its durability and beautiful grain patterns, perfect for dinner sets and furniture.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Neem Wood</h3>
              <p className="text-charcoal-600">
                Natural antibacterial properties make it ideal for kitchenware and serving items.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-3">Saal Wood</h3>
              <p className="text-charcoal-600">
                Strong and versatile, excellent for storage solutions and decorative pieces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;