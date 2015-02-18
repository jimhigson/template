function startLine(element, visWin, series) {

    var firstPoint = series[0];
    var xPx = visWin.x(firstPoint.date);

    element.select('line').attr({
        x1: xPx,
        x2: xPx,
        y1: visWin.y.range()[0],
        y2: visWin.y.range()[1]
    })

    element.select('circle').attr({
        cx: xPx,
        cy: visWin.y(firstPoint.percentiles[50])
    })
}