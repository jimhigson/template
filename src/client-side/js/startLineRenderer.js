module.exports = function startLine(eventBus, element, visWin) {

    element.select('line').attr({
        y1: visWin.y.range()[0],
        y2: visWin.y.range()[1]
    });

    var firstPoint;

    function dataLoaded(model) {
        var series = model.series;
        firstPoint = series[0];

        element.select('circle').attr({
            cy: visWin.y(firstPoint.percentiles[50])
        });

        updateFrame();
        eventBus.on('panOrZoom', updateFrame);
    }

    function updateFrame() {

        var xPx = visWin.x(firstPoint.date);

        element.select('line').attr({
            x1: xPx,
            x2: xPx
        });

        element.select('circle').attr({
            cx: xPx
        });
    }

    eventBus.on('lpChart:dataLoaded', dataLoaded);
};