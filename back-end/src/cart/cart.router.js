const express = require('express');
const Cart = require('./cart.model');
const Products = require('../products/products.model');
const { protect } = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Fonction pour récupérer le panier selon userId ou guestId
const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

router.post('/', async (req, res) => {
  const { productId, category, quantity, color, guestId, userId } = req.body;

  // Validation des données
  if (!productId || !category || !color || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Récupération du produit
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await getCart(userId, guestId);

    const normalizedCategory = category.toLowerCase();
    const normalizedColor = color.toLowerCase();

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.color?.toLowerCase() === normalizedColor &&
          p.category?.toLowerCase() === normalizedCategory
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || '',
          description: product.description,
          price: product.price,
          oldPrice: product.oldPrice,
          color,
          category,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
      
    } else {
      const newCart = await Cart.create({
        user:userId ? userId : undefined,
        guestId:guestId ? guestId : 'guest_' +new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url ,
            description: product.description,
            price: product.price,
            oldPrice: product.oldPrice,
            color,
            category,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error('❌ Error adding product to cart:', error.message);
    return res.status(500).json({ message: 'Error adding product to cart' });
  }
});




router.put('/', async (req, res) => {
const{productId,category,quantity,color,userId,guestId} = req.body;


try {
  let cart= await getCart(userId, guestId);
  if(!cart) return res.status(404).json({message:"Cart not found"});
const productIndex = cart.products.findIndex((p) => p.productId.toStrin() === productId &&
p.color ==color);


if (productIndex > -1) {
  if(quantity>0){
    cart.products[productIndex].quantity =quantity;
  }else{
        cart.products.splice(productIndex,1);

  }
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    return res.status(200).json(cart);
}else{
  return res.status(404).json({massage: "Product not found in cart"});
}





} catch (error) {
      console.error( error);
    return res.status(500).json({ message: 'Error adding product to cart' });

}




  }
)



router.delete("/", async (req, res) => {
  const { productId, category, quantity, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color
    );



if (productIndex > -1) {
        cart.products.splice(productIndex,1);
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    return res.status(200).json(cart);

}else{
  return res.status(404).json({massage: "Product not found in cart"});
}




} catch (error) {
      console.error( error);
    return res.status(500).json({ message: 'Server Error' });

}});

router.post("/merge",verifyToken, async (req, res) => {
  const { guestId } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    // If no guest cart
    if (!guestCart) {
      return userCart
        ? res.status(200).json(userCart)
        : res.status(404).json({ message: "Guest cart not found" });
    }

    // Guest cart is empty
    if (guestCart.products.length === 0) {
      return res.status(400).json({ message: "Guest cart is empty" });
    }

    // Merge logic if userCart exists
    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const index = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.color === guestItem.color
        );

        if (index > -1) {
          userCart.products[index].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      await userCart.save();

      // Delete guest cart
      try {
        await Cart.findOneAndDelete({ guestId });
      } catch (err) {
        console.error("Error deleting guest cart:", err);
      }

      return res.status(200).json(userCart);
    } else {
      // No existing user cart: convert guest cart to user cart
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;

      await guestCart.save();

      return res.status(200).json(guestCart);
    }
  } catch (error) {
    console.error("Merge error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
