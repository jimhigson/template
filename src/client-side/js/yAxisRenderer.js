var _ = require('lodash');

var pairExtent = require('./pairs.js').pairExtent;
var interpolateBetweenPair = require('./pairs.js').interpolateBetweenPair;
var translateX  = require('./svgUtils.js').translateX;
var translateXY = require('./svgUtils.js').translateXY;

function render(element, visWin) {

    console.log('drawing y scale', visWin.y, 'as an axis on', element);

    var height = pairExtent(visWin.y.range());
    var numberMajorTicks = Math.abs(height / 100);
    var numberMinorTicks = Math.abs(height / 33.33);

    var LABEL_ROUNDING = 7;

    var moneyFormat = function(amount){
        return '£' + Math.round(amount/1000) + 'k';
    };

    function notZero(tick){
        return tick > 0;
    }

    var majorTickValues = visWin.y.ticks(numberMajorTicks).filter(notZero);
    var majorTicks = element
        .select('.major')
        .selectAll('.tick')
        .data(majorTickValues);

    var minorTickValues = _.remove(visWin.y.ticks(numberMinorTicks), function(t){return !~majorTickValues.indexOf(t)})
                            .filter(notZero);
    var minorTicks = element
                    .select('.minor')
                    .selectAll('.tick')
                    .data(minorTickValues);

    var xRange = visWin.x.range();
    var xMinPx = xRange[0];
    var xMaxPx = xRange[1];

    function initTickGroups(sel) {
        return sel.enter()
            .append('svg:g')
                .attr('class', 'tick')
                .attr('transform', function(moneyAmount){ return translateXY(0, Math.round(visWin.y(moneyAmount))) });
    }

    var newMajorTicks = initTickGroups( majorTicks );
    var newMinorTicks = initTickGroups( minorTicks );

    newMajorTicks
        .append('svg:line')
            .attr('x1', xMinPx)
            .attr('x2', xMaxPx);

    newMinorTicks
        .append('svg:line')
            .attr('x1', xMinPx)
            .attr('x2', xMaxPx);

    var labelProportionalDistance = 0.125;

    newMajorTicks
        .append('svg:g')
        .attr('class', 'label')
        .attr('transform', translateX(Math.round(interpolateBetweenPair(xRange, labelProportionalDistance))));

    newMajorTicks
        .append('svg:g')
        .attr('class', 'label')
        .attr('transform', translateX(Math.round(interpolateBetweenPair(xRange, 1-labelProportionalDistance))));

    var newLabels = newMajorTicks.selectAll('g.label');

    newLabels
        .append('svg:rect')
        .attr({
            x: "-35",
            y: "-12",
            rx: LABEL_ROUNDING,
            ry: LABEL_ROUNDING,
            width: "70",
            height: "24"
        });

    newLabels
        .append('svg:text')
            .attr('dy', 5)
            .text(moneyFormat);

    majorTicks.exit().remove();
}

module.exports = function yAxisRenderer(eventBus, element, visWin) {

    // we don't care about panning, we need only render once when the data is loaded
    eventBus.on('dataLoaded', render.bind(null, element, visWin));
};