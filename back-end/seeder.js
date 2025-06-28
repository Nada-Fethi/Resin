const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./src/products/products.model");
const User = require("./src/users/user.model");
const Cart = require("./src/cart/cart.model");
const products = require("../frontend/src/data/products.json");

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.DB_URL);

const seedData = async () => {
    try {
      // Clear existing data
      await Product.deleteMany();
      await User.deleteMany();
      await Cart.deleteMany();
  
      // Create a default admin User
      const createdUser = await User.create({
        name: "Admin1",
        email: "admin1@mail.com",
        password: "123456",
        role: "admin",
      });
  
      const userID = createdUser._id;

      const sampleProducts = products.map((product) => {
        return { ...product, user: userID }; // Changed 'userID' to 'user' for association
      });
      
      // Insert the products into the database
      await Product.insertMany(sampleProducts);
      
      console.log("Product data seeded successfully!");
      process.exit();
     } catch (error) {
        console.error("Error seeding the data:", error);
        process.exit(1);
      }
    };