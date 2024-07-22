import express from 'express';
import { Order } from '../models/orderModel.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = {
            buyer: req.body.buyer,
            seller: req.body.seller,
            product: req.body.product,
            // Add other required fields as needed
        };
        const order = await Order.create(newOrder);
        return res.status(201).send(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json({
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get one order by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        return res.status(200).json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Order.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).send({ message: 'Order updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Order.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).send({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
