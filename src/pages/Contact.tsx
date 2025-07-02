import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-charcoal-600 max-w-3xl mx-auto">
            Have questions about our products or need assistance? We're here to help. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Address</h3>
                    <p className="text-charcoal-600">
                      OMII WOODS<br />
                      Haridwar, Uttarakhand<br />
                      India - 249407
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Phone</h3>
                    <p className="text-charcoal-600">+91 9876543210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Email</h3>
                    <p className="text-charcoal-600">info@omiiwoods.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-1">Business Hours</h3>
                    <div className="text-charcoal-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="bg-wood-50 rounded-lg p-6">
              <h3 className="font-semibold text-charcoal-900 mb-4">Company Details</h3>
              <div className="space-y-2 text-sm text-charcoal-600">
                <p><strong>CIN:</strong> U31001UT2025PTC018537</p>
                <p><strong>GSTIN:</strong> 05AAECO6026D1ZU</p>
                <p><strong>Founded:</strong> January 29, 2025</p>
                <p><strong>Founders:</strong> Ms. Swati Choudhary & Mr. Vibhu Chaudhary</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-wood-200 p-8">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-wood-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
                
                <Button type="submit" size="lg" icon={Send}>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="font-semibold text-charcoal-900 mb-3">
                What materials do you use for your products?
              </h3>
              <p className="text-charcoal-600">
                We use premium quality shisham, neem, and saal wood sourced responsibly 
                from local forests in Uttarakhand. All our products are made with 
                food-safe finishes.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="font-semibold text-charcoal-900 mb-3">
                Do you offer custom orders?
              </h3>
              <p className="text-charcoal-600">
                Yes, we accept custom orders for both individual customers and businesses. 
                Contact us with your requirements and we'll provide a detailed quote.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="font-semibold text-charcoal-900 mb-3">
                What is your shipping policy?
              </h3>
              <p className="text-charcoal-600">
                We offer nationwide shipping across India. Orders above ₹2000 qualify 
                for free shipping. Delivery typically takes 5-7 business days.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-wood-200 p-6">
              <h3 className="font-semibold text-charcoal-900 mb-3">
                How do I care for wooden products?
              </h3>
              <p className="text-charcoal-600">
                Clean with mild soap and water, dry immediately, and apply food-safe 
                oil monthly. Avoid soaking in water or putting in dishwasher.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;