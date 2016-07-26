module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect;
    
    this.Given(/^a valid product$/, function () {
        this.product = {
            data: {
                type: 'products',
                attributes: {
                    name: 'Alicate', price: 47, brand: 'Taurus', model: 'Bico fino'
                    }
                }
            }
    });
    
    this.Then(/^the new product id$/, function () {
        expect(this.responseBody.data.id).not.to.be.undefined;
    });
    
}