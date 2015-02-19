function visibleWindow(dimensions, MARGIN, series) {

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

    return {
        x: createXScale(),
        y: createYScale()
    };
}