'use strict';

const
    rx = require('rx'),
    EventEmitter = require('events').EventEmitter,
    emitter = new EventEmitter();
    
module.exports.publish = function(event) {
    console.log('publishing event', event, 'at', event.attributes.kind);
    emitter.emit(event.attributes.kind, event);
};
    
module.exports.subscribe = function(eventType, callback) {
    console.log('subscribing to', eventType);
    const src = rx.Observable.fromEvent(emitter, eventType);
    const subs = src.subscribe(callback);
};
