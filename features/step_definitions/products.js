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
    
    this.Given(/^an invalid product that (.*)$/, function (condition) {
        if(condition=="is missing the name")
        {
            this.product = {
            data: {
                type: 'products',
                attributes: {
                    name: '', price: 47, brand: 'Taurus', model: 'Bico fino'
                    }
                }
            }
        }
        if(condition=="has a negative price")
        {
            this.product = {
            data: {
                type: 'products',
                attributes: {
                    name: 'Alicate', price: -47, brand: 'Taurus', model: 'Bico fino'
                    }
                }
            }
        }
    });
    
}