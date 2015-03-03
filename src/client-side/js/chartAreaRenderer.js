var pairExtent = require('./pairs.js').pairExtent;

module.exports = function(eventBus, container, visWin) {

    container
        .attr({
            x: visWin.x.range()[0],
            width: Math.abs(pairExtent(visWin.x.range())),
            y: visWin.y.range()[1],
            height: Math.abs(pairExtent(visWin.y.range()))
        });
};