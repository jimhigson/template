
var chartView = (function() {

    function setDimensions(dChart, dimensions) {
        dChart.attr(dimensions);
        dChart.select('rect.bg').attr(dimensions);
    }

    function chartView(chartElement, w, h, model) {
        var dimensions = {
            width: w,
            height: h
        };

        console.log('chartView: creating chart at element', chartElement);

        var dChart = d3.select(chartElement);

        setDimensions(dChart, dimensions);

        var dataArea = dChart.select('.data');

        return {};
    }

    return chartView;
})();