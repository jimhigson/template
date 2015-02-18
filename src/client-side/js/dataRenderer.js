
var dataRenderer = (function() {

    function xComponent(xScale) {
        return function(d) { return Math.round(xScale(d.date)) }
    }

    function yComponent(yScale, percentile) {
        return function(d) { return Math.round(yScale(d.percentiles[percentile])) };
    }

    function lineRenderer(element, visWin, series, percentile) {

        var line = d3.svg.line()
            .x(xComponent(visWin.x))
            .y(yComponent(visWin.y, percentile));

        element.append('svg:path')
            .data(series)
            .attr("d", line(series) );
    }

    function areaRenderer(element, visWin, series, upperPercentile, lowerPercentile) {

    }

    return {
        line: lineRenderer,
        area: areaRenderer
    }

})();