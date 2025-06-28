const express = require("express");
const router = express.Router();
const Subscriber = require("../upload/Subscriber");

// @route POST /api/subscribe
// @desc Handle newsletter subscription
// @access Public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

try {
  // Check if the email is already subscribed
  let subscriber = await Subscriber.findOne({ email });

  if (subscriber) {
    return res.status(400).json({ message: "email is already subscribed" });
  }


subscriber = new Subscriber({email});
await subscriber.save();

res.status(201).json({message:"Successfully subscribed"})




} catch (error) {
  // Handle any errors that occur during the database query
  console.error(error); // Log the error for debugging
  return res.status(500).json({ message: "Server error during subscription check" });
}











  // ... (rest of the code to handle subscription, e.g., saving to DB)
});






module.exports = router;