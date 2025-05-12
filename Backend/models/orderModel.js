const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    // Add more fields as needed, e.g. transactionId, paymentMethod, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);