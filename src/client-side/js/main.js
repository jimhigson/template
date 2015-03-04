
var requestSimulationData = require('./data/requestSimulationData.js');
var EventEmitter = require('node-event-emitter').EventEmitter;
var chartView = require('./chartView.js');

var eventBus = new EventEmitter;

chartView('#mainChart', eventBus);

requestSimulationData(eventBus);