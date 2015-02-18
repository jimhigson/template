function xAxisView(element, visWin) {

    var YEAR_ONLY_FORMAT = d3.time.format('%Y');

    console.log('drawing x scale', visWin.x, 'as an axis on', element);

    var ticks = element.selectAll('.tick')
                    .data(visWin.x.ticks(8))

    var yRange = visWin.y.range();

    var newTicks = ticks.enter()
            .append('svg:g')
                .attr('class', 'tick major')
                .attr('transform', function(date){ return translateX( visWin.x(date) ) });

    newTicks
        .append('svg:line')
            .attr('y1', yRange[0])
            .attr('y2', yRange[1]);
    newTicks
        .append('svg:text')
        .attr('transform', translateXY(0, yRange[1]))
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

    var newTicks = ticks.enter()
            .append('svg:g')
                .attr('class', 'tick major')
                .attr('transform', function(moneyAmount){ return translateXY(0, visWin.y(moneyAmount)) });

    newTicks
        .append('svg:line')
            .attr('x1', xRange[0])
            .attr('x2', xRange[1]);

    var newLabels = newTicks
        .append('svg:g')
        .attr('class', 'label')
        .attr('transform', translateX(visWin.x.range()[0]));

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