const express = require('express');
const Order = require('../Order/order'); // Correct import
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Fetch all orders with user details - only admin can do this
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "username email").sort({ createdAt: -1 });
;
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Update order status by ID - only admin can update status
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            // Update order status if provided
            order.status = req.body.status || order.status;

            // If status is Delivered, mark delivery details
            if (req.body.status === "Delivered") {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete an order by ID - only admin can delete
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user","username");
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
