
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

        return function() {
            element
                .datum(series)
                .attr("d", line );
        }
    }

    function areaRenderer(element, visWin, series, lowerPercentile, upperPercentile) {
        var area = d3.svg.area()
            .x(xComponent(visWin.x))
            .y0(yComponent(visWin.y, lowerPercentile))
            .y1(yComponent(visWin.y, upperPercentile));

        return function() {
            element
                .datum(series)
                .attr("d", area );
        }
    }

    return {
        line: lineRenderer,
        area: areaRenderer
    }

})();