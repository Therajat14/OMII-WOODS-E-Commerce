import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ProductGrid from '../components/Product/ProductGrid';
import { searchProducts } from '../data/products';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <SearchIcon className="h-6 w-6 text-charcoal-600" />
            <h1 className="text-3xl font-display font-bold text-charcoal-900">
              Search Results
            </h1>
          </div>
          
          {query && (
            <p className="text-charcoal-600">
              Showing {searchResults.length} results for "{query}"
            </p>
          )}
        </div>

        {query ? (
          <ProductGrid 
            products={searchResults} 
            emptyMessage={`No products found for "${query}"`}
          />
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-24 w-24 text-charcoal-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-charcoal-900 mb-2">
              Enter a search term
            </h2>
            <p className="text-charcoal-600">
              Use the search bar above to find products
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;