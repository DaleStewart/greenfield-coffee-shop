const express = require('express');
const router = express.Router();
const path = require('path');

// Load coffee data
const coffees = require(path.join(__dirname, '..', 'data', 'coffees.json'));

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

// Checkout page
router.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout' });
});

// Checkout confirmation page
router.get('/checkout/confirmation', (req, res) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }

  res.render('confirmation', {
    title: 'Order Confirmation',
    orderNumber: `GC-${suffix}`
  });
});

module.exports = router;
