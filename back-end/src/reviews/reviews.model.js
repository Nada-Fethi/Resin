const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true }, // Fix typo in "require" → "required"
        rating: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Fix "objectId" → "ObjectId"
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
    },
    { timestamps: true }
);

// Correct model name (no space in "Review")
const Reviews = mongoose.model("Review", ReviewSchema);

// Correct export statement
module.exports = Reviews;
