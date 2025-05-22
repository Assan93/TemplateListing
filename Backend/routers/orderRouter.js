const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Add new order endpoint
router.post('/add', async (req, res) => {
  try {
    const { template, price, email } = req.body;

    // Validate required fields
    if (!template || !price || !email) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new order
    const newOrder = new Order({
      template,
      price,
      email: email.toLowerCase(),
      paymentStatus: 'pending'
    });

    // Save the order
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      _id: savedOrder._id,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('template', 'name price image category'); // Populate template details

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching order'
    });
  }
});

module.exports = router;