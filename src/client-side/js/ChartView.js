
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
        // todo: more individual renderers should be created early and
        // listen for dataloaded themselves

        var visWin = visibleWindow(dimensions, MARGIN, model.series, eventBus);

        dChart.select('.chartArea')
            .attr({
                x: visWin.x.range()[0],
                width: Math.abs(pairExtent(visWin.x.range())),
                y: visWin.y.range()[1],
                height: Math.abs(pairExtent(visWin.y.range()))
            });

        goalsRenderer(eventBus, dChart.select('.goals'), visWin, _.map(model.goalsByDate) );
        xAxisRenderer(eventBus, d3.select('.axes .x'), visWin);
        yAxisRenderer(eventBus, d3.select('.axes .y'), visWin);
        startLineRenderer(eventBus, dChart.select('.startLine'), visWin, model.series);

        lineRenderer(eventBus, dChart.selectAll('path.median'), visWin, model.series, 50);
        areaRenderer(eventBus, dChart.select('path.moreLikely'), visWin, model.series, 30, 70);
        areaRenderer(eventBus, dChart.select('path.lessLikely'), visWin, model.series, 10, 90);

        priceToolTipRenderer(
            eventBus,
            dChart.selectAll('path.median.hoverSpace'),
            dChart.selectAll('.priceTooltip'),
            visWin,
            model.series
        );

        arrowsRenderer(eventBus, dChart.select('.arrows'), visWin);

        panAndZoom(dChart, $('#zoomer'), visWin);
    });
};


