module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect;
        
    this.Given(/^an existing order with a (.*) status$/, function (status) {
        const 
            that = this,
            payload = {
            data: {
                type: 'orders',
                attributes: {
                    status: status,
                    items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33', quantity: 1}]
                    }
                }
            }
        
        return this.doHttpRequest('orders', 'post', payload)
        .then((response) => {
            that.existingOrder = response.body;
            return response;
        });
    });
    
    this.When(/^I search this order$/, function () {
        const 
            that = this,
            id = this.existingOrder.data.id;
        return this.doHttpRequest('orders/' + id, 'get', undefined)
        .then((response) => {
            that.responseBody = JSON.parse(response.body);
            return response;
        });
    });
    
    this.Then(/^I receive the order data$/, function () {
        expect(this.responseBody.data).not.to.be.undefined;
    });
    
    this.Then(/^its status is (.*)$/, function (status) {
        expect(this.responseBody.data.attributes.status).to.equal(status);
    });
    
    
    
    this.Given(/^a valid order$/, function () {
        this.payload = {
            data: {
                type: 'orders',
                attributes: {
                    status: "new",
                    items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33', quantity: 1}]
                    }
                }
            }
    });
    
    this.When(/^I submit it to the API$/, function () {
        const 
            that = this;
        return this.doHttpRequest('orders', 'post', that.payload)
        .then((response) => {
            that.responseBody = response.body;
            return response;
        })
        .catch(error => {
            that.error = error;
            return error;
        })
    });
    
    this.Then(/^I receive a success message$/, function () {
        expect(this.responseBody.data).not.to.be.undefined;
    });
    
    this.Then(/^the new order id$/, function () {
        expect(this.responseBody.data.id).not.to.be.undefined;
    });
    
    
    this.Given(/^an invalid order that (.*)$/, function (condition) {
        if(condition=="is missing an item quantity")
        {
            this.payload = {
                data: {
                    type: 'orders',
                    attributes: {
                        status: "new",
                        items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a8d33', quantity: 0}]
                        }
                    }
                };
        }
        if(condition=="has an invalid format in product_id")
        {
           this.payload = {
                data: {
                    type: 'orders',
                    attributes: {
                        status: "new",
                        items: [{ product_id: 'xxx', quantity: 1}]
                        }
                    }
                };
        }
        if(condition=="refers an inexistend product")
        {
            this.payload = {
                data: {
                    type: 'orders',
                    attributes: {
                        status: "new",
                        items: [{ product_id: '598b04ea-8c20-4240-9c2b-1d36350a7d30', quantity: 1}]
                        }
                    }
                }
        }
    });
    
    this.Then(/I receive an error response$/, function () {
        console.log(this.error.body.errors[0].validation.keys[0]);
        expect(this.error.body.errors[0].validation.keys[0]).to.equal("data.attributes.items.0.quantity");
    });
    
   /* this.Then(/a message saying that(.*)$/, function (notification) {
        console.log(notification);
        //expect(this.error.errors[0].message).not.to.be.undefined;
    });*/
}
