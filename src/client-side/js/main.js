
var $ = require('jquery');
var requestSimulationData = require('./data/requestSimulationData.js');
var chartView = require('./chartView.js');
var event = require('node-event-emitter');

$(function() {

    var eventBus = new event.EventEmitter;
    var emitDataLoaded = eventBus.emit.bind(eventBus, 'dataLoaded');

    var windowWidth = $(window).width();

    var dimensions = {
        width: windowWidth,
        height: 400
    };

    chartView(document.getElementById('mainChart'), dimensions, eventBus);

    requestSimulationData(emitDataLoaded);
});
