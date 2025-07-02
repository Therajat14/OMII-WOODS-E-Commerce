import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import { products } from '../../data/products';
import { useCart } from '../../contexts/CartContext';

const Wishlist: React.FC = () => {
  const { addItem } = useCart();
  
  // Mock wishlist items (in real app, this would come from context/API)
  const wishlistItems = products.slice(0, 3);

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      category: product.category
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-charcoal-600">
            Items you want to buy later ({wishlistItems.length} items)
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border border-wood-200 overflow-hidden group">
                <div className="relative aspect-square">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-charcoal-900 mb-3">
                    ₹{product.price.toLocaleString()}
                  </p>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      icon={ShoppingCart}
                      fullWidth
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-charcoal-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-charcoal-600 mb-8">
              Save items you love to your wishlist and shop them later.
            </p>
            <Button size="lg" asChild>
              <a href="/products">Start Shopping</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;