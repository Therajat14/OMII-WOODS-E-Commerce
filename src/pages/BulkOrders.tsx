import React, { useState } from 'react';
import { Package, Users, Award, Calculator, Send } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';

const BulkOrders: React.FC = () => {
  const [quoteForm, setQuoteForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    productCategory: '',
    quantity: '',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote request submitted:', quoteForm);
    // Reset form
    setQuoteForm({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      productCategory: '',
      quantity: '',
      requirements: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuoteForm({
      ...quoteForm,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: Package,
      title: 'Volume Discounts',
      description: 'Significant savings on large quantity orders with tiered pricing structure.'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Personal account manager to handle your orders and provide ongoing support.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous quality control and inspection for all bulk orders.'
    },
    {
      icon: Calculator,
      title: 'Custom Pricing',
      description: 'Flexible pricing options based on volume, frequency, and partnership terms.'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-6">
            B2B Bulk Orders
          </h1>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            Partner with OMII WOODS for your business needs. We offer competitive pricing, 
            reliable supply, and exceptional service for bulk orders.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-12">
            Why Choose Us for Bulk Orders?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-3">{benefit.title}</h3>
                <p className="text-charcoal-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-12">
            Volume Pricing Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-wood-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Starter</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">5-10%</div>
              <p className="text-charcoal-600 mb-6">Discount on orders</p>
              <ul className="space-y-2 text-charcoal-600 mb-8">
                <li>• 50-200 pieces</li>
                <li>• Standard delivery</li>
                <li>• Email support</li>
                <li>• Basic packaging</li>
              </ul>
              <Button variant="outline" fullWidth>Get Quote</Button>
            </div>
            
            <div className="bg-primary-50 rounded-lg border-2 border-primary-200 p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Business</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">10-20%</div>
              <p className="text-charcoal-600 mb-6">Discount on orders</p>
              <ul className="space-y-2 text-charcoal-600 mb-8">
                <li>• 200-1000 pieces</li>
                <li>• Priority delivery</li>
                <li>• Dedicated support</li>
                <li>• Custom packaging</li>
              </ul>
              <Button fullWidth>Get Quote</Button>
            </div>
            
            <div className="bg-white rounded-lg border border-wood-200 p-8 text-center">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">20%+</div>
              <p className="text-charcoal-600 mb-6">Discount on orders</p>
              <ul className="space-y-2 text-charcoal-600 mb-8">
                <li>• 1000+ pieces</li>
                <li>• Express delivery</li>
                <li>• Account manager</li>
                <li>• Custom branding</li>
              </ul>
              <Button variant="outline" fullWidth>Contact Sales</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Quote Request Form */}
          <div>
            <div className="bg-white rounded-lg border border-wood-200 p-8">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Request a Quote
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={quoteForm.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      value={quoteForm.contactName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={quoteForm.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={quoteForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Product Category *
                    </label>
                    <select
                      name="productCategory"
                      required
                      value={quoteForm.productCategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="dinner-sets">Dinner Sets</option>
                      <option value="serving-trays">Serving Trays</option>
                      <option value="storage-boxes">Storage Boxes</option>
                      <option value="wooden-toys">Wooden Toys</option>
                      <option value="gift-baskets">Gift Baskets</option>
                      <option value="drinkware">Drinkware</option>
                      <option value="kitchen-accessories">Kitchen Accessories</option>
                      <option value="custom">Custom Products</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Estimated Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      value={quoteForm.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Number of pieces"
                      min="50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Specific Requirements
                  </label>
                  <textarea
                    name="requirements"
                    rows={4}
                    value={quoteForm.requirements}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please describe your specific requirements, timeline, customization needs, etc."
                  />
                </div>
                
                <Button type="submit" size="lg" icon={Send} fullWidth>
                  Request Quote
                </Button>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Process */}
            <div className="bg-wood-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Our Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-charcoal-900">Quote Request</h4>
                    <p className="text-sm text-charcoal-600">Submit your requirements through our form</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-charcoal-900">Consultation</h4>
                    <p className="text-sm text-charcoal-600">Our team reviews and contacts you within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-charcoal-900">Custom Quote</h4>
                    <p className="text-sm text-charcoal-600">Receive detailed pricing and timeline</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-charcoal-900">Production</h4>
                    <p className="text-sm text-charcoal-600">Order confirmation and production begins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">Direct Contact</h3>
              <div className="space-y-3">
                <p className="text-charcoal-600">
                  <strong>B2B Sales Team:</strong><br />
                  Email: b2b@omiiwoods.com<br />
                  Phone: +91 9876543210
                </p>
                <p className="text-charcoal-600">
                  <strong>Business Hours:</strong><br />
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">What Our Partners Say</h3>
              <blockquote className="text-charcoal-700 italic mb-3">
                "OMII WOODS has been our trusted partner for wooden kitchenware. Their quality 
                is exceptional and their service is always reliable. Highly recommended for 
                bulk orders."
              </blockquote>
              <cite className="text-sm text-charcoal-600">
                - Rajesh Kumar, Procurement Manager, Hotel Chain
              </cite>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BulkOrders;