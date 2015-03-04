
var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');

var visibleWindow = require('./visibleWindow.js');
var goalsRenderer = require('./goalsRenderer.js');
var chartAreaRenderer = require('./chartAreaRenderer.js');
var xAxisRenderer = require('./xAxisRenderer.js');
var yAxisRenderer = require('./yAxisRenderer.js');
var startLineRenderer = require('./startLineRenderer.js');
var lineRenderer = require('./dataRenderer.js').line;
var areaRenderer = require('./dataRenderer.js').area;
var priceToolTipRenderer = require('./priceToolTipRenderer.js');
var arrowsRenderer = require('./arrowsRenderer.js');
var panAndZoom = require('./panAndZoom.js');


function chartView(chartElement, eventBus) {

    var MARGIN = {top: 2, right: -25, bottom: 50, left: -25};

    eventBus = eventBus || new EventEmitter();

    var dimensions = {
        width: $(chartElement).width(),
        height: $(chartElement).height()
    };

    function setDimensions(dChart, dimensions) {
        dChart.attr(dimensions);
        dChart.select('rect.bg').attr(dimensions);
    }

    var dChart = d3.select(chartElement).classed('chart', true);
    setDimensions(dChart, dimensions);

    var visWin = visibleWindow(eventBus, dimensions, MARGIN);

    function addRenderer(renderer, elementCss, rendererParams) {
       renderer(eventBus, dChart.selectAll(elementCss), visWin, rendererParams);
    }

    addRenderer(chartAreaRenderer, '.chartArea');
    addRenderer(goalsRenderer, '.goals');
    addRenderer(arrowsRenderer, '.arrows');
    addRenderer(xAxisRenderer, '.axes .x');
    addRenderer(yAxisRenderer, '.axes .y');
    addRenderer(startLineRenderer, '.startLine');
    addRenderer(lineRenderer, 'path.median', {percentile: 50});
    addRenderer(areaRenderer, 'path.moreLikely', {lowerPercentile: 30, upperPercentile: 70});
    addRenderer(areaRenderer, 'path.lessLikely', {lowerPercentile: 10, upperPercentile: 90});

    eventBus.once('dataLoaded', function(model) {

        priceToolTipRenderer(
            eventBus,
            dChart.selectAll('path.median.hoverSpace'),
            dChart.selectAll('.priceTooltip'),
            visWin,
            model.series
        );

        panAndZoom(dChart, $('#zoomer'), visWin, model);
    });
}

module.exports = chartView;

// also export to non-Browserify code. This may not be good practice but not clear how
// else to export to a land that only understands global varialbes.
window.chartView = chartView;

