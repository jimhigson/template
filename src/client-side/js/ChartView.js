

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

    var dChart = d3.select(chartElement)
                        .data(model.series);

    setDimensions(dChart, dimensions);

    var renderers = [];

    renderers.push( xAxisView(d3.select('.axes .x'), visWin) );
    yAxisView(d3.select('.axes .y'), visWin);

    dChart.select('.chartArea')
        .attr({
            x: visWin.x.range()[0],
            width: Math.abs(pairExtent(visWin.x.range())),
            y: visWin.y.range()[1],
            height: Math.abs(pairExtent(visWin.y.range()))
        });

    renderers.push( startLine(dChart.select('.startLine'), visWin, model.series) );

    renderers.push( dataRenderer.line(dChart.select('.data .median'), visWin, model.series, 50) );
    renderers.push( dataRenderer.area(dChart.select('.data .moreLikely'), visWin, model.series, 30, 70) );
    renderers.push( dataRenderer.area(dChart.select('.data .lessLikely'), visWin, model.series, 10, 90) );

    function render() {
        renderers.forEach(function(r){r()});
    }

    render();

    panAndZoom(dChart, visWin, function() {
        render();
        console.log('some zooming happened');
    });

    return {};
}

