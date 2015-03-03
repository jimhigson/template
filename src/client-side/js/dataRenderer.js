
var d3 = require('d3');

function xComponent(xScale) {
    return function(d) { return Math.round(xScale(d.date)) }
}

function yComponent(yScale, percentile) {
    return function(d) { return Math.round(yScale(d.percentiles[percentile])) };
}

function lineRenderer(eventBus, element, visWin, series, percentile) {

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

function areaRenderer(eventBus, element, visWin, series, lowerPercentile, upperPercentile) {
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

module.exports = {
    line: lineRenderer,
    area: areaRenderer
};