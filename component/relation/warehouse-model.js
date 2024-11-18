const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    status: {
        type: Boolean,
    }
});

warehouseSchema.plugin(timestamps);

module.exports = mongoose.model('Warehouse', warehouseSchema);
