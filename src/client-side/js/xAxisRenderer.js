var AVERAGE_MONTH = require('./timeConstants.js').AVERAGE_MONTH;
var pairExtent = require('./pairs.js').pairExtent;
var _ = require('lodash');
var translateX = require('./svgUtils.js').translateX;
var translateXY = require('./svgUtils.js').translateXY;

module.exports = function xAxisView(element, visWin) {

    var YEAR_ONLY_FORMAT = d3.time.format('%Y');
    var MONTH_AND_YEAR_FORMAT = d3.time.format('%b %Y');
    var YEAR = 1000 * 60 * 60 * 24 * 365;
    var width = pairExtent(visWin.x.range());
    var numberMajorTicks = width / 150;
    var numberMinorTicks = width / 30;

    console.log('drawing x scale', visWin.x, 'as an axis on', element);

    var yRange = visWin.y.range();
    var yMin = yRange[0];
    var yMax = yRange[1];

    function keyDatesByTimestamp(d){
        return +d;
    }

    function getMajorTickValues() {
        return visWin.x.ticks(numberMajorTicks);
    }

    function getMinorTickValues() {

        var ticks = visWin.x.ticks(numberMinorTicks);

        var averageTick = (_.last(ticks).getTime() - _.first(ticks).getTime()) / ticks.length;

        if( averageTick <  AVERAGE_MONTH/2 ) {
            // don't want week ticks
            return [];
        } else {
            return ticks;
        }
    }

    return function() {

        var majorTickValues = getMajorTickValues();
        var majorTicks = element
                            .select('.major')
                            .selectAll('.tick')
                            .data(majorTickValues, keyDatesByTimestamp);

        var minorTickValues = getMinorTickValues();
        var minorTicks = element
                            .select('.minor')
                            .selectAll('.tick')
                            .data(minorTickValues, keyDatesByTimestamp);

        function tickTranslate(date) {
            return translateX(Math.round(visWin.x(date)));
        }

        function initTickGroups(sel) {
            return sel.enter()
                .append('svg:g')
                    .attr('class', 'tick');
        }

        var newMajorTicks = initTickGroups(majorTicks);
        var newMinorTicks = initTickGroups(minorTicks);

        minorTicks.attr('transform', tickTranslate);
        majorTicks.attr('transform', tickTranslate);

        newMajorTicks
            .append('svg:line')
                .attr('y1', yMin)
                .attr('y2', yMax);

        function addTickExtension(sel, size) {
            sel
                .append('svg:line')
                    .attr('class', 'extend')
                    .attr('y1', yMin)
                    .attr('y2', yMin + size);
        }

        addTickExtension(newMajorTicks, 15);
        addTickExtension(newMinorTicks, 7);

        newMajorTicks
            .append('svg:text')
            .attr('transform', translateXY(0, yMin))
            .attr('dy', 30);

        var timeBetweenTicks = (majorTickValues[1] - majorTickValues[0]);
        var dateFormatter = timeBetweenTicks < YEAR ? MONTH_AND_YEAR_FORMAT : YEAR_ONLY_FORMAT;

        majorTicks.selectAll('text').text(dateFormatter);

        majorTicks.exit().remove();
        minorTicks.exit().remove();
    }

}