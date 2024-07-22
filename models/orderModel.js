import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
  },{
    timestamps:true,
  });
  
export const Order= mongoose.model('Order', orderSchema);