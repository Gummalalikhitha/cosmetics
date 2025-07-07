// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // POST /api/orders
// router.post("/orders", async (req, res) => {
//   try {
//     const { billingDetails, products, totalAmount, userEmail } = req.body;

//     // Basic validation
//     if (!billingDetails || !products || !userEmail || !totalAmount) {
//       return res.status(400).json({ message: "Missing order information" });
//     }

//     const newOrder = new Order({
//       billingDetails,
//       products,
//       totalAmount,
//       userEmail,
//     });

//     await newOrder.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("❌ Error saving order:", error);
//     res.status(500).json({ message: "Server error while saving order" });
//   }
// });
// router.get("/orders/:email", async (req, res) => {
//   try {
//     const orders = await Order.find({ userEmail: req.params.email });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// });

// module.exports = router;

// File: routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Place Order
// router.post('/orders', async (req, res) => {
//   try {
//     const { userEmail, billingDetails, products, totalAmount } = req.body;
//     if (!billingDetails || !products || !totalAmount || !userEmail) {
//       return res.status(400).json({ message: "Missing order details" });
//     }

//     const newOrder = new Order({ userEmail, billingDetails, products, totalAmount });
//     await newOrder.save();
//     res.status(201).json({ message: 'Order placed successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Order placement failed', error: err });
//   }
// });
// routes/orderRoutes.js or in server.js
router.post('/orders', async (req, res) => {
  try {
    const { billingDetails, products, totalAmount, userEmail } = req.body;

    if (!billingDetails || !products || !totalAmount || !userEmail) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const newOrder = new Order({
      billingDetails,
      products,
      totalAmount,
      userEmail,
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order placed", order: savedOrder });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
});

// Get Orders for a User
router.get('/:email', async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err });
  }
});

module.exports = router;
