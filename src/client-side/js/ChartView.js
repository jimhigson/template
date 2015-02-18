

function chartView(chartElement, w, h, model) {

    var MARGIN = {top: 10, right: 10, bottom: 50, left: 50};

    var dimensions = {
        width: w,
        height: h
    };

    function setDimensions(dChart, dimensions) {
        dChart.attr(dimensions);
        dChart.select('rect.bg').attr(dimensions);
    }

    function createScales( series ) {
        var xScale = d3.time.scale()
            .range([0, dimensions.w - MARGIN.left - MARGIN.right], 0, 0)
            .domain(d3.extent(series, function (d) {
                return d.date;
            }));

        var minMoney = d3.min(series, function(point) { return data.percentiles[10] });
        var maxMoney = d3.max(series, function(point) { return data.percentiles[90] });

        var moneyDomain = [minMoney, maxMoney];

        var yScale = d3.scale.linear()
            .range([dimensions.h - margin.top - margin.bottom, 0])
            .domain(moneyDomain);

        return {
            x:xScale,
            y:yScale
        }
    }

    //var scales = createScales( model.series );

    console.log('chartView: creating chart at element', chartElement, 'for data', model);

    var dChart = d3.select(chartElement);

    setDimensions(dChart, dimensions);

    var dataArea = dChart.select('.data');

    return {};
}


