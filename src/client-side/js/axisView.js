function xAxisView(element, visWin) {

    var YEAR_ONLY_FORMAT = d3.time.format('%Y');

    console.log('drawing x scale', visWin.x, 'as an axis on', element);

    var yRange = visWin.y.range();
    var yMin = yRange[0];
    var yMax = yRange[1];

    var ticks = element.selectAll('.tick')
                    .data(visWin.x.ticks(8));

    var newTicks = ticks.enter()
            .append('svg:g')
                .attr('class', 'tick major')
                .attr('transform', function(date){ return translateX(Math.round(visWin.x(date))) });
    newTicks
        .append('svg:line')
            .attr('y1', yMin)
            .attr('y2', yMax);
    newTicks
        .append('svg:text')
        .attr('transform', translateXY(0, yMax))
        .attr('dy', 15)
        .text(YEAR_ONLY_FORMAT);

    ticks.exit().remove();

    return {};
}

function yAxisView(element, visWin) {

    console.log('drawing y scale', visWin.y, 'as an axis on', element);

    var LABEL_ROUNDING = 7;
    var moneyFormat = function(amount){
        return '£' + Math.round(amount/1000) + 'k';
    };

    var ticks = element.selectAll('.tick')
                    .data(visWin.y.ticks(3));

    var xRange = visWin.x.range();
    var xMinPx = xRange[0];
    var xMaxPx = xRange[1];

    var newTicks = ticks.enter()
            .append('svg:g')
                .attr('class', 'tick major')
                .attr('transform', function(moneyAmount){ return translateXY(0, Math.round(visWin.y(moneyAmount))) });

    newTicks
        .append('svg:line')
            .attr('x1', xMinPx)
            .attr('x2', xMaxPx);

    newTicks
        .append('svg:g')
        .attr('class', 'label')
        .attr('transform', translateX(Math.round(interpolateBetweenPair(xRange, 0.1))));

    newTicks
        .append('svg:g')
        .attr('class', 'label')
        .attr('transform', translateX(Math.round(interpolateBetweenPair(xRange, 0.9))));

    var newLabels = newTicks.selectAll('g.label');

    newLabels
        .append('svg:rect')
        .attr({
            x: "-35",
            y: "-10",
            rx: LABEL_ROUNDING,
            ry: LABEL_ROUNDING,
            width: "70",
            height: "25"
        });

    newLabels
        .append('svg:text')
            .attr('dy', 7)
            .text(moneyFormat);

    ticks.exit().remove();

    return {};
}