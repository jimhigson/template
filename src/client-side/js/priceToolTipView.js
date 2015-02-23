function priceToolTipRenderer(hoverElement, renderElement, visWin, series) {

    function showTooltipNearMouse() {
        var mousePos = d3.mouse(hoverElement.node());

        var mousePosX = mousePos[0];
        var xTime = visWin.x.invert(mousePosX);
        var dataPoint = dataPointClosestTo(xTime)

        var xPix = visWin.x(dataPoint.date);
        var yPix = visWin.y(dataPoint.percentiles[50]);

        renderElement.attr('transform', translateXY(Math.round(xPix), Math.round(yPix)));
    }

    // This is extremely sub-optimal! Should be replaced with a log(n) time operation.
    function dataPointClosestTo(targetDate) {
        var targetDateTimestamp = +targetDate;

        return _.min(series, function(seriesPoint){
            var seriesTimestamp = (+seriesPoint.date);

            return Math.abs(seriesTimestamp - targetDateTimestamp);
        })
    }

    function hideTooltip() {
        renderElement.style('display','none')
    }

    hoverElement
        .on("mouseenter", function(){ renderElement.style('display','') })
        .on("mousemove", showTooltipNearMouse)
        .on("mouseleave", hideTooltip);

    hideTooltip();

    return function(){};
}