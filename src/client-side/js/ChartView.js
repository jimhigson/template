

function chartView(chartElement, w, h, model) {

    var MARGIN = {top: 2, right: 0, bottom: 50, left: 0};

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

    dChart.select('.chartArea')
        .attr({
            x: visWin.x.range()[0],
            width: pairExtent(visWin.x.range()),
            y: visWin.y.range()[0],
            height: pairExtent(visWin.y.range())
        });



    var dataArea = dChart.select('.data');

    return {};
}


