const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    items: [
        {
            name: {
                type: String,
                required: true
            },

            description: {
                type: String
            },

            price: {
                type: Number,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed'],
        default: 'Pending'
    },

    date: {
        type: String,
        default: () => new Date().toLocaleString()
    }

});

module.exports = mongoose.model('Order', OrderSchema);