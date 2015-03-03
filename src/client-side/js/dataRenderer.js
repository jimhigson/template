
var d3 = require('d3');
var _ = require('lodash');

function xComponent(xScale) {
    return function(d) { return Math.round(xScale(d.date)) }
}

function yComponent(yScale, percentile) {
    return function(d) { return Math.round(yScale(d.percentiles[percentile])) };
}

function lineRenderer(eventBus, element, visWin, config, model) {

    var series = model.series;
    var percentile = config.percentile;

    var line = d3.svg.line()
        .x(xComponent(visWin.x))
        .y(yComponent(visWin.y, percentile));

    function updateFrame() {
        element
            .datum(series)
            .attr("d", line );
    }

    eventBus.on('panOrZoom', updateFrame);
    updateFrame();
}

function areaRenderer(eventBus, element, visWin, config, model) {

    var series = model.series;
    var upperPercentile = config.upperPercentile;
    var lowerPercentile = config.lowerPercentile;

    var area = d3.svg.area()
        .x(xComponent(visWin.x))
        .y0(yComponent(visWin.y, lowerPercentile))
        .y1(yComponent(visWin.y, upperPercentile));

    function updateFrame() {
        element
            .datum(series)
            .attr("d", area );
    }

    eventBus.on('panOrZoom', updateFrame);
    updateFrame();
}

function startRenderingWhenDataLoaded(renderer, eventBus, element, visWin, config) {
    eventBus.on('dataLoaded', function(model) {
        renderer(eventBus, element, visWin, config, model);
    });
}

module.exports = {
    line: _.partial(startRenderingWhenDataLoaded, lineRenderer),
    area: _.partial(startRenderingWhenDataLoaded, areaRenderer)
};