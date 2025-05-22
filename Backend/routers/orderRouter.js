const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Get user orders
router.get('/user-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('template')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Error in user-orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create new order
router.post('/add', async (req, res) => {
  try {
    const { template, price, email, paymentStatus } = req.body;

    if (!template || !price || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      template,
      price,
      email,
      paymentStatus: paymentStatus || 'pending'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

module.exports = router;