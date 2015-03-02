
var $ = require('jquery');
var requestSimulationData = require('./data/requestSimulationData.js');
var chartView = require('./chartView.js');
var event = require('node-event-emitter');

$(function() {

    var eventBus = new event.EventEmitter;
    var emitDataLoaded = eventBus.emit.bind(eventBus, 'dataLoaded');

    var windowWidth = $(window).width();
    chartView(document.getElementById('mainChart'), windowWidth, 400, eventBus);

    requestSimulationData(emitDataLoaded);
});
