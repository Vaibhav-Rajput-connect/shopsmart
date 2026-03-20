const express = require('express');
const router = express.Router();

let products = [];
let nextId = 1;

// Get all products
router.get('/', (req, res) => {
  res.json(products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// Get product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Create a new product
router.post('/', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const product = {
    id: nextId++,
    name,
    description,
    price: parseFloat(price),
    imageUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  products.push(product);
  res.status(201).json(product);
});

// Update a product
router.put('/:id', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index !== -1) {
    products[index] = {
      ...products[index],
      name: name || products[index].name,
      description: description || products[index].description,
      price: price ? parseFloat(price) : products[index].price,
      imageUrl: imageUrl !== undefined ? imageUrl : products[index].imageUrl,
      updatedAt: new Date().toISOString()
    };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete a product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// For testing purposes
router._reset = () => {
  products = [];
  nextId = 1;
};

module.exports = router;
