const service = require('./service');
const CONFIG = require('../config/config');
const { orderValidation } = require('./validation');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    try {
        const { error, value } = await orderValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        value.products = await new Promise((resolve, reject) => {
            value.products.map(async (item) => {
                item.productId = new mongoose.Types.ObjectId(item.productId);
                item.warehouseId = new mongoose.Types.ObjectId(item.warehouseId);
                const product = await service.findProduct(item.productId, item.warehouseId);
                if (!product) return reject({ message: "Product not found" });

                const filter = product.warehouses.find(element => element.warehouseId !== null)
                if (filter.stok <= item.quantity) return reject({ message: "Stok not enough" });

                await product.warehouses.map((data) => {
                    if (data.warehouseId) {
                        if (JSON.stringify(data.warehouseId._id) == JSON.stringify(item.warehouseId)) {
                            data.stok -= item.quantity;
                        }
                    }
                    return data;
                })

                product.warehouses = product.warehouses
                product.save();
                return resolve(item);
            });
        });

        value.user = req.user._id;
        await service.create(value);
        return res.status(201).json({ message: 'created', status: true });
    } catch (error) {
        if (error.message === "Warehouse not found") return res.status(404).json({ message: error.message, status: false });
        return res.status(500).json({ message: error.message, status: false });
    }
};

exports.find = async (req, res) => {
    try {
        const user = req.user
        console.log('user = ', user);
        const order = await service.findByUser(user._id);
        return res.status(200).json({ message: 'success', order });
    } catch (error) {
        console.log('ERR = ', 'edot-shop-service', 'find', error);
        return res.status(500).json({ message: 'unsuccess' });
    }
};

exports.update = async (req, res) => {
    try {
        const order = await service.findOne(new mongoose.Types.ObjectId(req.params.orderId));
        if (!order) return res.status(404).json({ message: 'Order not found', status: false });

        order.payment = "true";
        order.save();
        return res.status(200).json({ message: 'success', status: true });
    } catch (error) {
        console.log('ERR = ', 'edot-order-service', 'find', error.message);
        return res.status(500).json({ message: error.message });
    }
};
