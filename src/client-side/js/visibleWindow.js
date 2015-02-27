var TIME_CONSTANTS = require('./timeConstants.js');
var pairExtent = require('./pairs.js').pairExtent;
var expandPair = require('./pairs.js').expandPair;
var positiveOnly = require('./pairs.js').positiveOnly;
var d3 = require('d3');

module.exports = function visibleWindow(dimensions, MARGIN, series) {

    var timeLeftExpandProportion = 0.25;

    var x = createXScale();
    var y = createYScale();

    function createXScale() {

        var firstDate = series[0].date;
        var timeDomain = [firstDate, new Date(firstDate.getTime() + TIME_CONSTANTS.YEAR * 10)];

        var extentMs = pairExtent(timeDomain);

        var expandedTimeDomain = [  new Date(timeDomain[0] - extentMs * timeLeftExpandProportion),
                                    timeDomain[1]
                                 ];
        return d3.time.scale()
            .range([MARGIN.left, dimensions.width - MARGIN.right])
            .domain(expandedTimeDomain);
    }

    function createYScale() {
        var minMoney = d3.min(series, function(point) { return point.percentiles[10] });

        var maxMoney = d3.max(series, function(point) { return point.percentiles[90] });
        var moneyDomain = [minMoney, maxMoney];

        var expandedMoneyDomain = positiveOnly(expandPair(moneyDomain, 0.2));

        var pixelRange = [dimensions.height - MARGIN.bottom, MARGIN.top];
        return d3.scale.linear()
            .range(pixelRange)
            .domain(expandedMoneyDomain);
    }

    /*  returns the density in terms of the width in px of one average-length month
        on the chart */
    function timeDensity() {
        var rangePx = pairExtent( x.range() );
        var domainMs = pairExtent( x.domain() );
        var domainMonths = domainMs/TIME_CONSTANTS.AVERAGE_MONTH;

        return rangePx / domainMonths;
    }

    return {
        x: x,
        y: y,
        height: dimensions.height - MARGIN.top - MARGIN.bottom,
        width: dimensions.width - MARGIN.left - MARGIN.right,
        timeDensity: timeDensity,
        timeExtent: function(){
            return pairExtent(x.domain());
        },
        timeCentre: function() {
            var xRange = x.range();
            var pixCentre = xRange[0] + pairExtent(xRange)/2;
            return x.invert(pixCentre);
        },
        centreOnTime: function(time) {
            var timeMs = time.getTime();
            var halfDomainExtent = this.timeExtent()/2;
            var newDomain = [new Date(timeMs - halfDomainExtent), new Date(timeMs + halfDomainExtent)];

            x.domain(newDomain);
        },
        fullDateRange: d3.extent(series, function (d) {
            return d.date;
        })
    };
}