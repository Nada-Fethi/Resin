const express = require('express');
const Order = require('./order');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken'); // adjust the path



router.get('/my-orders', verifyToken,async (req, res) => {
    try {
    const orders = await Order.find({ user: req.userId }) // req.userId جاي من verifyToken
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// @route GET /api/orders/:id
// @desc Get order details by ID
// @access Private
router.get("/:id",verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the full order details
    res.json(order);

    
  } catch (error) {
    // Handle potential errors, e.g., invalid ID format
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});









module.exports = router;
