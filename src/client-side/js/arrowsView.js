function arrowsView(sel, visWin) {
    var nextArrow = sel.select('.next');
    var previousArrow = sel.select('.previous');

    var distanceFromEdge = 35;

    var yPx = visWin.height/2;

    previousArrow.attr('transform', translateXY(distanceFromEdge, yPx) );
    nextArrow.attr('transform', translateXY(visWin.width - 50 - distanceFromEdge, yPx) );

    return function() {
    }
}