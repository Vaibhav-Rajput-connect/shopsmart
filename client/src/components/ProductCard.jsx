import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <img 
        src={product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
        <p className="product-desc">{product.description}</p>
        <div className="card-actions">
          <button className="btn btn-secondary" onClick={() => onEdit(product)}>
            <Edit2 size={16} /> Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
