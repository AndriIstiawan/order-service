//Validation
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

//Ar Validation
exports.orderValidation = data => {
    const schema = Joi.object({
        products: Joi.array().items(warehouses).required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
};

let warehouses = Joi.object().keys({
    productId: Joi.objectId().required(),
    warehouseId: Joi.objectId().required(),
    quantity: Joi.number().required(),
})