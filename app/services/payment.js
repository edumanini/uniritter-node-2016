'use strict';

const 
    uuid = require('uuid'),
    eh = require('../utils/eventhandling')

eh.subscribe('order.created', newOrder => {
    const key = newOrder.attributes.key;
    console.log('handling payment for order', key);
    setTimeout(() => {
        console.log('payment for order', key, 'done.');
        const data = {
            type: 'order_events',
            id: uuid.v4(),
            attributes: {
                kind: 'order.paid',
                key: key,
                eventDate: new Date()
            }};
        return eh.publish(data);
        
    }, 1000);
});
