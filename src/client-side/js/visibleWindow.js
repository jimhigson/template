function visibleWindow(dimensions, MARGIN, series) {

    function createXScale() {
        return d3.time.scale()
            .range([MARGIN.left, dimensions.width - MARGIN.right])
            .domain(d3.extent(series, function (d) {
                return d.date;
            }));
    }

    function createYScale() {
        var minMoney = d3.min(series, function(point) { return point.percentiles[10] });
        var maxMoney = d3.max(series, function(point) { return point.percentiles[90] });

        var moneyDomain = [minMoney, maxMoney];

        return d3.scale.linear()
            .range([MARGIN.top, dimensions.height - MARGIN.bottom])
            .domain(moneyDomain);

    }

    return {
        x: createXScale(),
        y: createYScale()
    };
}