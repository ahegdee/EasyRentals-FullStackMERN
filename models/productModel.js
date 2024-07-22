import mongoose from "mongoose";

const productSchema=mongoose.Schema({

  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
    timestamps:true,
})

export const Product= mongoose.model('Product', productSchema);