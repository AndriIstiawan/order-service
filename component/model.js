const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        warehouseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    payment: {
        type: String, default: "false"
    },
    expiredTime: {
        type: Date, default: Date.now() + 3600000
    }
});

orderSchema.plugin(timestamps);

module.exports = mongoose.model('Order', orderSchema);
