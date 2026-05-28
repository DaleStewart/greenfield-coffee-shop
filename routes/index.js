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

module.exports = router;
