var expect = require('chai').expect;
const orderModel = require('../component/model');

describe('order', function () {
    it('should return err', function (done) {
        const order = new orderModel()
        error = order.validateSync();
        expect(error.errors['user'].message).to.equal('Path `user` is required.');
        done()
    })
});