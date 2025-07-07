const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/verify', (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const hash = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                     .update(`${order_id}|${payment_id}`)
                     .digest('hex');

  if (hash === signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});

module.exports = router;
