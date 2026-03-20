import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Setup Product',
  price: 9.99,
  description: 'A test product'
};

describe('ProductCard component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onEdit={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText('Test Setup Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
  });

  it('calls onEdit and onDelete when buttons are clicked', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();
    
    render(<ProductCard product={mockProduct} onEdit={handleEdit} onDelete={handleDelete} />);
    
    fireEvent.click(screen.getByText(/Edit/i));
    expect(handleEdit).toHaveBeenCalledWith(mockProduct);
    
    fireEvent.click(screen.getByText(/Delete/i));
    expect(handleDelete).toHaveBeenCalledWith(mockProduct.id);
  });
});
