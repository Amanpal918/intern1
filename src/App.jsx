import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategorySelector from './CategorySelector';
import ProductList from './ProductList';
import SearchBar from './SearchBar';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      // Construct the URL based on the selected category
      let url = selectedCategory
        ? `https://dummyjson.com/products/category/${selectedCategory}`
        : `https://dummyjson.com/products`;

      try {
        const response = await axios.get(url);
        setProducts(response.data.products); // Adjusted based on the expected response structure
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProducts([]); // Clear products when changing category
    setError(null); 
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setProducts([]); // Clear products on search
    setError(null); 
  };

  return (
    <div className="app-container bg-gray-100 min-h-screen p-4 flex flex-col">
      <header className="flex justify-start items-start mb-4">
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="main-content flex-grow flex">
        <aside className="category-selector w-1/4 p-4">
          <CategorySelector categories={categories} onChange={handleCategoryChange} />
        </aside>

        <main className="product-list-container w-3/4 p-4 bg-slate-500 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-4">Product Listing</h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <ProductList products={products} searchTerm={searchTerm} />
        </main>
      </div>
    </div>
  );
};

export default App;
