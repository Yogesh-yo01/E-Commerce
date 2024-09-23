const OrderModel=require('../models/orderModel')
const ProductModel=require('../models/productModel')
// Get Products Api - /api/v1/order
exports.CreateOrder =async (req, res, next)=>{

    const cartItems=req.body;
    const amount= Number(cartItems.reduce((acc,item)=>(acc + item.product.price * item.qty),0)).toFixed(2);
    const status = 'Pending';

    const order = await OrderModel.create({cartItems, amount, status})
    
    //Updating product stock qty
    cartItems.forEach(async (item)=>{
        const product = await ProductModel.findById(item.product._id);
        product.stock=product.stock-item.qty;
        await product.save();
    })

    res.json({
        success: true,
        order
    })
}