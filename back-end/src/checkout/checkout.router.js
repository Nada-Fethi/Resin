const express = require('express');
// const mongoose = require('mongoose');  // <--- Ajoute cette ligne
const verifyToken = require('../middleware/verifyToken'); // adjust the path

const Checkout = require('./checkout.model'); // Correct import
// const Products = require('../products/products.model'); // Ensure this is correctly defined
const Cart = require('../cart/cart.router'); // Ensure this is correctly defined
const Order = require('../Order/order');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    const newCheckout = await Checkout.create({
      user: req.userId, // we set req.userId in your verifyToken middleware
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log(`Checkout created for user: ${req.userId}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);
    res.status(500).json({  message: error.message  });
  }
});

router.put('/:id/pay',  verifyToken,async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
  
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails ;
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/:id/finalize',verifyToken, async (req, res) => {

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message: "Checkout not found"});
        }


        if (checkout.isPaid && !checkout.isFinalized){

            const finalOrder = await Order.create({
                user: checkout.user,
  orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice:checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered:false,
                paymentStatus: "paid",
                paymentDetails:checkout.paymentDetails,
            

            });
            checkout.isFinalized= true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({user: checkout.user});
            res.status(201).json(finalOrder);
        }

        else if (checkout.isFinalized) {

            res.status(400).json({message: "Checkout already finalized"});
            
        }else{
res.status(400).json({ message: "Checkout not paid yet" });

        }

    } catch (error) {
                console.error(error);
  res.status(500).json({ message: "Server Error", error: error.message });
   
    }



});
    module.exports =router;