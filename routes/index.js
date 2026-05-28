const express = require('express');
const router = express.Router();
const path = require('path');

// Load coffee data
const coffees = require(path.join(__dirname, '..', 'data', 'coffees.json'));
const TAX_RATE_DECIMAL = 0.08;
const MOCK_ORDER_ITEM_COUNT = 2;
const DEFAULT_ORDER_QUANTITY = 1;

// Home page — show 3 featured coffees
router.get('/', (req, res) => {
  const featured = coffees.slice(0, 3);
  res.render('home', { title: 'Home', featured });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Order page — show full menu
router.get('/order', (req, res) => {
  res.render('order', { title: 'Order Coffee', coffees });
});

// Checkout page — UI-only mock order summary
router.get('/checkout', (req, res) => {
  const orderItems = coffees.slice(0, MOCK_ORDER_ITEM_COUNT).map(coffee => ({
    id: coffee.id,
    name: coffee.name,
    quantity: DEFAULT_ORDER_QUANTITY,
    price: coffee.price
  }));

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE_DECIMAL;
  const total = subtotal + tax;

  res.render('checkout', {
    title: 'Checkout',
    orderItems,
    subtotal,
    tax,
    total
  });
});

module.exports = router;
