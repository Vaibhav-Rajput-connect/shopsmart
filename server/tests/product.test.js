const request = require('supertest');
const app = require('../src/app');
const productRoutes = require('../src/routes/product');

describe('Product API Integration Tests', () => {
  let productId;

  afterAll(async () => {
    productRoutes._reset();
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Testing description',
        price: 99.99,
        imageUrl: 'http://example.com/test.jpg'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Product');
    productId = res.body.id;
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a single product by id', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        description: 'Updated testing description',
        price: 199.99,
        imageUrl: 'http://example.com/test2.jpg'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted');
  });
});
