import express from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            // Add other required fields as needed
        };
        const product = await Product.create(newProduct);
        return res.status(201).send(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get one product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).send({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
