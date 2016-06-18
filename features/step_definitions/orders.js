module.exports = function () {
    const 
        _ = require('lodash'),
        chai = require('chai'),
        expect = chai.expect,
        sample_payload = {
            "data": {
                "type": "orders",
                "attributes": {
                    "items": [
                        { "product_id": "cfcad047-e1b7-43c2-b101-3ac4adcf9818", quantity: 1 },
                        { "product_id": "cfcad047-e1b7-43c2-b101-3ac4adcf9819", quantity: 3 }
                    ]
                }
            }
        };
        
    chai.use(require('chai-subset'));

    this.Given(/^a valid order$/, function () {
        this.payload = sample_payload;
        this.verb = 'post';
        this.endpoint = 'orders';
        this.expected = { statusCode: 201 };
    });
    
    this.When(/^I submit it to the API$/, function () {
        const that = this;
        return this.doHttpRequest(this.endpoint, this.verb, this.payload)
        .then(function(response) {
            that.response = response;
            return response;
        });
    });

    this.Given(/^an order in a 'new' status$/, function () {
        const that = this;
        var payload = _.clone(sample_payload);
        payload.data.attributes.status = 'new';
        return this.doHttpRequest('orders', 'post', payload)
        .then(result => that.existingOrder = result.body);

    });

    this.Then(/^I receive a success message$/, function () {
        expect(this.response.statusCode).to.equal(this.expected.statusCode);
    });
    
    this.Then(/^the new order id$/, function() {
        expect(this.response.body.data.id).to.not.be.undefined;
    });
  
    this.When(/^I ask to cancel it$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });
    
    this.Then(/^my order status turns to 'cancelled'$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });
    
    this.Then(/^a message saying that (.*)$/, function (notification, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });
    
    this.Then(/^I receive an error response$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });
    
    this.Given(/^an invalid order that (.*)$/, function (condition, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });
    
   this.Given(/^an existing order with a (.*) status$/, function (status) {
        const that = this;
        var payload = _.clone(sample_payload);
        payload.data.attributes.status = status;
        return this.doHttpRequest('orders', 'post', payload)
        .then(result => that.existingOrder = result.body);
   });

   this.When(/^I search this order$/, function () {
        const that = this;
        return this.doHttpRequest('orders/' + this.existingOrder.data.id, 'get', undefined)
        .then(result => that.response = JSON.parse(result.body));
   });

   this.Then(/^I receive the order data$/, function () {
       expect(this.response.data).to.not.be.undefined;
   });

   this.Then(/^its status is (.*)$/, function (s) {
       expect(this.response.data.attributes.status).to.equal(s);
   });

}
