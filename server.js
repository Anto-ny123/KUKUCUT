const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/Order');
const Message = require('./models/Message');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());



// Save Order
app.post('/order', async (req, res) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: 'Order saved' });
});
// Get Orders
app.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// Update Order Status
app.put('/orders/:id', async (req, res) => {
    try {
        console.log("Updating order:", req.params.id);
        console.log("New status:", req.body.status);

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!order) {
            console.log("Order not found");
            return res.status(404).json({
                message: "Order not found"
            });
        }

        console.log("Order updated:", order);

        res.status(200).json({
            message: "Order status updated successfully",
            order: order
        });

    } catch (error) {
        console.error("UPDATE ORDER ERROR:", error);

        res.status(500).json({
            message: "Failed to update order",
            error: error.message
        });
    }
});
// Delete Order
app.delete('/orders/:id', async (req, res) => {
    try {
        console.log("Deleting order:", req.params.id);

        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            console.log("Order not found:", req.params.id);

            return res.status(404).json({
                message: "Order not found"
            });
        }

        console.log("Order deleted successfully:", order._id);

        res.status(200).json({
            message: "Order deleted successfully"
        });

    } catch (error) {
        console.error("DELETE ORDER ERROR:", error);

        res.status(500).json({
            message: "Failed to delete order",
            error: error.message
        });
    }
});
// Save Message
app.post('/message', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: "Message saved successfully",
            data: savedMessage
        });

    } catch (error) {
        console.error("MESSAGE SAVE ERROR:", error);

        res.status(500).json({
            message: "Failed to save message",
            error: error.message
        });
    }
});


// Get Messages
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });

        res.json(messages);

    } catch (error) {
        console.error('GET MESSAGES ERROR:', error);

        res.status(500).json({
            message: 'Failed to get messages',
            error: error.message
        });
    }
});
// Update message status
app.put('/message/:id/status', async (req, res) => {

    try {

        const { status } = req.body;

        if (!['Read', 'Unread'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status'
            });
        }

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                message: 'Message not found'
            });
        }

        res.json({
            message: 'Message status updated',
            data: message
        });

    } catch (error) {

        console.error('Update message status error:', error);

        res.status(500).json({
            message: 'Failed to update message status'
        });
    }
});
// Delete message
app.delete('/message/:id', async (req, res) => {

    try {

        const message = await Message.findByIdAndDelete(
            req.params.id
        );

        if (!message) {
            return res.status(404).json({
                message: 'Message not found'
            });
        }

        res.json({
            message: 'Message deleted successfully'
        });

    } catch (error) {

        console.error('Delete message error:', error);

        res.status(500).json({
            message: 'Failed to delete message'
        });
    }
});
app.listen(3000, () => console.log('Server running on port 3000'));