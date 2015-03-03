
var d3 = require('d3');
var $ = require('jquery');
var _ = require('lodash');

var pairExtent = require('./pairs.js').pairExtent;

var visibleWindow = require('./visibleWindow.js');
var goalsRenderer = require('./goalsRenderer.js');
var xAxisRenderer = require('./xAxisRenderer.js');
var yAxisRenderer = require('./yAxisRenderer.js');
var startLineRenderer = require('./startLineRenderer.js');
var lineRenderer = require('./dataRenderer.js').line;
var areaRenderer = require('./dataRenderer.js').area;
var priceToolTipRenderer = require('./priceToolTipRenderer.js');
var arrowsRenderer = require('./arrowsRenderer.js');
var panAndZoom = require('./panAndZoom.js');


module.exports = function chartView(chartElement, w, h, eventBus) {

    var MARGIN = {top: 2, right: -25, bottom: 50, left: -25};

    var dimensions = {
        width: w,
        height: h
    };

    function setDimensions(dChart, dimensions) {
        dChart.attr(dimensions);
        dChart.select('rect.bg').attr(dimensions);
    }

    var dChart = d3.select(chartElement);
    setDimensions(dChart, dimensions);

    eventBus.once('dataLoaded', function(model) {

        var visWin = visibleWindow(eventBus, dimensions, MARGIN, model.series);

        function addRenderer(renderer, elementCss, rendererParams) {
           // TODO: don't pass the model. Let renderers wait themselves for it to arrive
           renderer(eventBus, dChart.select(elementCss), visWin, model, rendererParams || {});
        }

        dChart.select('.chartArea')
            .attr({
                x: visWin.x.range()[0],
                width: Math.abs(pairExtent(visWin.x.range())),
                y: visWin.y.range()[1],
                height: Math.abs(pairExtent(visWin.y.range()))
            });

        addRenderer(goalsRenderer, '.goals');
        addRenderer(xAxisRenderer, '.axes .x');
        addRenderer(yAxisRenderer, '.axes .y');
        addRenderer(startLineRenderer, '.startLine');
        addRenderer(lineRenderer, 'path.median', {percentile: 50});
        addRenderer(areaRenderer, 'path.moreLikely', {lowerPercentile: 30, upperPercentile: 70});
        addRenderer(areaRenderer, 'path.lessLikely', {lowerPercentile: 10, upperPercentile: 90});
        addRenderer(arrowsRenderer, '.arrows');

        priceToolTipRenderer(
            eventBus,
            dChart.selectAll('path.median.hoverSpace'),
            dChart.selectAll('.priceTooltip'),
            visWin,
            model.series
        );

        panAndZoom(dChart, $('#zoomer'), visWin);
    });
};


