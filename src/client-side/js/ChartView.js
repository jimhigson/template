

function chartView(chartElement, w, h, model) {

    var MARGIN = {top: 2, right: -25, bottom: 50, left: -25};

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

    yAxisView(d3.select('.axes .y'), visWin);

    dChart.select('.chartArea')
        .attr({
            x: visWin.x.range()[0],
            width: Math.abs(pairExtent(visWin.x.range())),
            y: visWin.y.range()[1],
            height: Math.abs(pairExtent(visWin.y.range()))
        });


    var renderers = [
        goalView( dChart.select('.goals'), visWin, model.goalGroups ),
        xAxisView(d3.select('.axes .x'), visWin),
        startLine(dChart.select('.startLine'), visWin, model.series),

        dataRenderer.line(dChart.selectAll('path.median'), visWin, model.series, 50),
        dataRenderer.area(dChart.select('path.moreLikely'), visWin, model.series, 30, 70),
        dataRenderer.area(dChart.select('path.lessLikely'), visWin, model.series, 10, 90),

        priceToolTipRenderer(
            dChart.selectAll('path.median.hoverSpace'),
            dChart.selectAll('.priceTooltip'),
            visWin,
            model.series
        )
    ];

    function render() {
        renderers.forEach(function(r){r()});
    }

    render();

    panAndZoom(dChart, visWin, function() {
        render();
    });

    return {};
}


