import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { getProducts, deleteProduct } from './api/product';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>ShopSmart</h1>
        <button className="btn" onClick={() => setIsFormOpen(true)}>
          <PlusCircle size={20} />
          Add Product
        </button>
      </header>

      <main>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '4rem' }}>
            <p>No products found. Add some to get started!</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct} 
          onClose={handleCloseForm} 
          onSuccess={fetchProducts} 
        />
      )}
    </div>
  );
}

export default App;
