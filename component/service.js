const order = require('./model');
const warehouse = require('./relation/warehouse-model');
const user = require('./relation/user-model');
const product = require('./relation/product-model');

exports.create = (body) => {
    return order.create(body);
};

exports.findOne = (orderId) => {
    return order.findOne({ _id: orderId, status: "false" });
};

exports.findByUser = (userId) => {
    return order.findOne({ user: userId });
};

exports.findUser = (userId) => {
    return user.findById(userId);
};

exports.findProduct = (productId, warehouseId) => {
    return product.findOne({ _id: productId, "warehouses.warehouseId": warehouseId }, { "warehouses._id": 0 }).populate({
        "path": 'warehouses.warehouseId',
        "match": { "_id": warehouseId }
    });
};

exports.findOrderJob = () => {
    return order.findOne({ expiredTime: { $lt: new Date() }, payment: 'false' });
};

exports.findWarehouse = (warehouseId) => {
    return warehouse.findById(warehouseId);
}

exports.find = (query) => {
    return order.aggregate([
        {
            $unwind: {
                path: '$warehouses'
            }
        },
        {
            $lookup: {
                from: "warehouses",
                localField: "warehouses._id",
                foreignField: '_id',
                as: 'warehouses.warehouse'
            },
        },
        {
            $match: { 'warehouses.warehouse.status': true }
        },
        {
            $unwind: {
                path: '$warehouses.warehouse'
            }
        },
        {
            $group: {
                _id: '$_id',
                warehouses: {
                    $push: '$warehouses'
                },
                total: { $sum: '$warehouses.stok' }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        {
            $unwind: {
                path: '$productDetails'
            }
        },
        {
            $addFields: {
                'productDetails.warehouses': '$warehouses',
                'productDetails.total': '$total'
            }
        },
        {
            $replaceRoot: {
                newRoot: '$productDetails'
            }
        }
    ]);
};
