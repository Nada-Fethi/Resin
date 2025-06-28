const express = require('express')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");




const port = process.env.PORT || 5000;



app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.use(cors(
    {  
        origin:'http://localhost:5173',
        credentials: true
    }
))





//routes
// const ProductRoutes = require('./src/user/ProductRoutes');
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');
// const manageRoutes = require('./src/manage/manage.route');
const cartRoutes = require('./src/cart/cart.router');
const adminRoutes = require('./src/AdminOrder/adminRoutes');
const adminProductRoutes = require('./src/AdminOrder/productAdminRoutes');
const adminOrderRoutes = require('./src/AdminOrder/adminOrderRoutes');
const checkoutRoutes = require('./src/checkout/checkout.router');
const orderRoutes = require('./src/Order/order.router');
const uploadRoutes = require('./src/upload/uploadRoutes');
const subscriberRoutes = require('./src/upload/Subscriber.Route');




// app.use('/api/Product',ProductRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/reviews',reviewRoutes);
// app.use('/api/manage',manageRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/adminProduct',adminProductRoutes);
app.use('/api/adminOrder',adminOrderRoutes);
app.use('/api/checkout',checkoutRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/subscriber',subscriberRoutes);









console.log()

app.get('/', (req, res) => {
  res.send('Hello nada!')
})

//RyQDcR9Y8PZB6nyp


main()
.then(() => console.log("mongodb is successfully connected"))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.DB_URL);
    }
    





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


