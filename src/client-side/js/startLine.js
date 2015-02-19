function startLine(element, visWin, series) {

    var firstPoint = series[0];

    element.select('line').attr({
        y1: visWin.y.range()[0],
        y2: visWin.y.range()[1]
    });

    element.select('circle').attr({
        cy: visWin.y(firstPoint.percentiles[50])
    });

    positionInX();

    function positionInX() {

        var xPx = visWin.x(firstPoint.date);

        element.select('line').attr({
            x1: xPx,
            x2: xPx
        });

        element.select('circle').attr({
            cx: xPx
        });
    }

    return positionInX;
}