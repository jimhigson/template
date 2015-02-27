
var $ = require('jquery');
var requestSimulationData = require('./data/requestSimulationData.js');
var chartView = require('./chartView.js');

$(function() {

    requestSimulationData(function(data){

        var windowWidth = $(window).width();

        chartView(document.getElementById('mainChart'), windowWidth, 400, data);
    });
});
