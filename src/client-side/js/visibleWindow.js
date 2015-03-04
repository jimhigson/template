var TIME_CONSTANTS = require('./timeConstants.js');
var pairExtent = require('./pairs.js').pairExtent;
var expandPair = require('./pairs.js').expandPair;
var positiveOnly = require('./pairs.js').positiveOnly;
var fireEventOnSetterCalled = require('./fireEventOnSetterCalled');
var d3 = require('d3');

module.exports = function visibleWindow(bus, dimensions, MARGIN) {

    var timeLeftExpandProportion = 0.25;

    var x = createXScale();
    var y = createYScale();

    function createXScale() {

        var scale = d3.time.scale()
            .range([MARGIN.left, dimensions.width - MARGIN.right]);

        bus.on('lpChart:dataLoaded', function(model) {
            var series = model.series;
            var firstDate = series[0].date;
            var timeDomain = [firstDate, new Date(firstDate.getTime() + TIME_CONSTANTS.YEAR * 10)];

            var extentMs = pairExtent(timeDomain);

            var expandedTimeDomain = [  new Date(timeDomain[0] - extentMs * timeLeftExpandProportion),
                                        timeDomain[1]
                                     ];
            scale.domain(expandedTimeDomain);
        });

        fireEventOnSetterCalled(bus, scale, 'domain', 'panOrZoom');

        return scale;
    }

    function createYScale() {

        var pixelRange = [dimensions.height - MARGIN.bottom, MARGIN.top];
        var scale = d3.scale.linear()
            .range(pixelRange);

        bus.on('lpChart:dataLoaded', function(model) {
            var series = model.series;
            var minMoney = d3.min(series, function(point) { return point.percentiles[10] });
            var maxMoney = d3.max(series, function(point) { return point.percentiles[90] });
            var moneyDomain = [minMoney, maxMoney];

            var expandedMoneyDomain = positiveOnly(expandPair(moneyDomain, 0.2));

            scale.domain(expandedMoneyDomain);
        });

        return scale;

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
        }
    };
}