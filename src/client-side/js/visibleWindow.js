function visibleWindow(dimensions, MARGIN, series) {

    var x = createXScale();
    var y = createYScale();

    function createXScale() {

        var timeDomain = d3.extent(series, function (d) {
            return d.date;
        });

        var extentMs = pairExtent(timeDomain);

        var expandedDomain = [new Date(timeDomain[0] - extentMs * 0.2), timeDomain[1]];
        return d3.time.scale()
            .range([MARGIN.left, dimensions.width - MARGIN.right])
            .domain(expandedDomain);
    }

    function createYScale() {
        var minMoney = d3.min(series, function(point) { return point.percentiles[10] });

        var maxMoney = d3.max(series, function(point) { return point.percentiles[90] });
        var moneyDomain = [minMoney, maxMoney];

        var expandedMoneyDomain = positiveOnly(expandPair(moneyDomain, 0.2));

        var pixelRange = [dimensions.height - MARGIN.bottom, MARGIN.top];
        return d3.scale.linear()
            .range(pixelRange)
            .domain(expandedMoneyDomain);
    }

    var MINUTE = 60 * 1000;
    var HOUR = 60 * MINUTE;
    var DAY = 24 * HOUR;
    var YEAR = DAY * 365.24;
    var AVERAGE_MONTH = YEAR/12;

    /*  returns the density in terms of the width in px of one average-length month
        on the chart */
    function timeDensity() {
        var rangePx = pairExtent( x.range() );
        var domainMs = pairExtent( x.domain() );
        var domainMonths = domainMs/AVERAGE_MONTH;

        return rangePx / domainMonths;
    }

    return {
        x: x,
        y: y,
        height: dimensions.height - MARGIN.top - MARGIN.bottom,
        width: dimensions.width - MARGIN.left - MARGIN.right,
        timeDensity: timeDensity
    };
}