

function chartView(chartElement, w, h, model) {

    var MARGIN = {top: 10, right: 10, bottom: 50, left: 150};

    var dimensions = {
        width: w,
        height: h
    };

    function setDimensions(dChart, dimensions) {
        dChart.attr(dimensions);
        dChart.select('rect.bg').attr(dimensions);
    }

    var visWin = visibleWindow(dimensions, MARGIN, model.series);

    console.log('chartView: creating chart at element', chartElement, 'for data', model);

    var dChart = d3.select(chartElement);

    setDimensions(dChart, dimensions);

    xAxisView(d3.select('.axes .x'), visWin);
    yAxisView(d3.select('.axes .y'), visWin);

    var dataArea = dChart.select('.data');

    return {};
}


