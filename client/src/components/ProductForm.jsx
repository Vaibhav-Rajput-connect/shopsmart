import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/product';

const ProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Error saving product');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-input" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input 
              type="number" 
              name="price" 
              step="0.01" 
              className="form-input" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              className="form-input" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input 
              type="url" 
              name="imageUrl" 
              className="form-input" 
              value={formData.imageUrl} 
              onChange={handleChange} 
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
