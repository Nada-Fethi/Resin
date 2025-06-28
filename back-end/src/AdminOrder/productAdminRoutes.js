const express = require('express');
const Product = require('../products/products.model'); // Correct import
const verifyToken = require('../middleware/verifyToken');
const { protect, admin } = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

router.get("/",  async (req, res) => {
    try {
        const products = await Product.find({}); 

        res.json(products);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
    });

    router.post("/create-product", async (req, res) => {
      
        try {
            const newProduct = new Product({
                ...req.body
            });
            
            const savedProduct = await newProduct.save();
    
          /*  const reviews = await Review.find({ productId: savedProduct._id });
    
            if(reviews.length > 0){
                const totalRating = reviews.reduce(
                    (acc, review) => acc + review.rating,
                    0);
                const averageRating = totalRating / reviews.length;
                savedProduct.rating = averageRating;
                    await savedProduct.save();
    
            }*/
    
            res.status(201).json(savedProduct);
        } catch (error) {
           
            console.log("Error creating product:", error);
            res.status(500).send({ message: error.message});
           }
    });
    

    
    router.patch("/updat-product/:id",verifyToken,verifyAdmin, async (req, res) => {
        try {
            const productId = req.params.id;
    
            const updatedProduct = await Products.findByIdAndUpdate(productId, {...req.body}, {new:true});
    
            if(!updatedProduct){
                return res.status(404).send({message:"product not found"});
            }
    
            res.status(200).send({message:"Product updated successfully",
                product:updatedProduct
            });
        } catch (error) {
            console.error("Error updating the product:", error);
            res.status(500).send({ message: "Failed to update the product"});
           }
    });
    
    router.delete("/:id", async(req, res) =>{
        try {
            const productId = req.params.id;
            const deletedProduct = await Products.findByIdAndDelete(productId);
    
            if (!deletedProduct) {
                return res.status(404).send({message: "Product not found"});
            }
            await Reviews.deleteMany({productId:productId })
    
            res.status(200).send({
                message: "Product deleted successfully"
            })
            
        } catch (error) {
            console.error("Error deleted the product:", error);
            res.status(500).send({ message: "Failed to deleted the product"});
        }
    });
    
    

        module.exports =router;