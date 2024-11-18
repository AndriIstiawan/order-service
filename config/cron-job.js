// const schedule = require('node-schedule');
const { CronJob } = require('cron');
const serviceOrder = require('../component/service');
const mongoose = require('mongoose');

// schedule.scheduleJob('* * * * *', function () {
//   console.log('The answer to life, the universe, and everything!');
// });

const cronJob = new CronJob("* * * * * *", async function () {
    // perform operation e.g. GET request http.get() etc.
    const order = await serviceOrder.findOrderJob();
    if (order) {
        order.payment = 'expired'
        order.products.map(async (item) => {
            item.productId = new mongoose.Types.ObjectId(item.productId);
            item.warehouseId = new mongoose.Types.ObjectId(item.warehouseId);
            const product = await serviceOrder.findProduct(item.productId, item.warehouseId);
            await product.warehouses.map((data) => {
                if (data.warehouseId) {
                    if (JSON.stringify(data.warehouseId._id) == JSON.stringify(item.warehouseId)) {
                        data.stok += item.quantity;
                    }
                }
                return data;
            })

            product.warehouses = product.warehouses
            product.save();
        });
        order.save();
    }
});

module.exports = cronJob;