'use strict';

const 
    Types = require('joi'),
    uuid = require('uuid'),
    eh = require('../utils/eventhandling'),
    _ = require('lodash');

module.exports = function (server) {
    const 
        harvesterPlugin = server.plugins['hapi-harvester'],
        schema = {
            type: 'products',
            attributes: {
                name: Types.string(),
                price: Types.number().min(0),
                brand: Types.string(),
                model: Types.string()
            }
        }

    
    server.route(harvesterPlugin.routes['get'](schema));
    server.route(harvesterPlugin.routes['getById'](schema));
    
    var post = _.clone(harvesterPlugin.routes['post'](schema));
    //hack: this is chockfull of state. No biggie, since it's a PoC. But please don't do this in prod code.
   
    server.route(post);
}
