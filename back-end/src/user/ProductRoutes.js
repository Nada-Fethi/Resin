const express = require('express');
const Products = require('../products'); // Assure-toi que ce chemin est correct
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

// Applique le middleware verifyToken pour protéger la route
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const {
            name,
            category,
            description,
            price,
            oldPrice,
            image,
            color
        } = req.body;

        // Création du produit en utilisant req.user.id comme auteur
        const product = new Products({
            name,
            category,
            description,
            price,
            oldPrice,
            image,
            color,
            author: req.user.id  // Utilise l'ID de l'utilisateur authentifié comme auteur
        });

        // Sauvegarde du produit
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create product");
    }
});

module.exports = router;
