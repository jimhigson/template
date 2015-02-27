var _ = require('lodash');

var translateX = require('./svgUtils.js').translateX;
var translateXY = require('./svgUtils.js').translateXY;
var scale = require('./svgUtils.js').scale;

var π = Math.PI, τ = 2 * π;

module.exports = function goalsView(container, visWin, goalsByDate) {

    var RADIUS = 24;

    var yOffset = visWin.height - RADIUS;
    container.attr('transform', translateXY(0, yOffset));

    var densityBoundary = 9;

    var dGoalGroups = container
        .selectAll('.goalsOnDate')
        .data(goalsByDate)
        .enter()
            .append('svg:g')
                .attr('class', 'goalsOnDate')
                .attr('data-goal-group', function(d, i){
                    return i;
                })
                .attr('goal-quantity', function(d){
                    return d.length;
                })
                .classed('multiple-goals', function(d){
                    return d.length > 1;
                });

    dGoalGroups
        .append('svg:circle')
            .attr('class', 'hover-space')
            .attr('r', 1.1 * RADIUS);

    var dNewGoals = dGoalGroups
        .append('svg:g')
            .attr('class', 'scaler')
                .selectAll('.goal')
                .data(function(goalArrayForDate){return goalArrayForDate})
                    .enter()
                        .append('svg:g')
                            .attr('class', 'goal');

    function multipleGoalOffset(compact, d, i) {
        var numberOfGoals = d.dateGroup.length;

        var scaleFactor = compact? Math.pow(0.85, numberOfGoals -1) : 1;

        var φ = i * τ/numberOfGoals + π;

        var proportionalDistanceFromCentre = Math.pow(1.2, numberOfGoals -1);
        var offsetFromCentre = RADIUS * (compact ? 0.5 : 1) * proportionalDistanceFromCentre;
        var x = offsetFromCentre * Math.sin(φ);
        var y = offsetFromCentre * Math.cos(φ);

        return scale(scaleFactor) + translateXY(x,y);
    }

    var compactGoalCluster = _.partial(multipleGoalOffset, true);
    var expandedGoalCluster = _.partial(multipleGoalOffset, false);

    dGoalGroups
        .filter(function(d){
            return d.length > 1;
        })
        .each(function() {
            var sel = d3.select(this);

            var goalsInGroup = sel.selectAll('.goal');

            d3.select(this)
                .on('mouseenter', function(){
                    if( isBig ) {
                        goalsInGroup.transition().attr('transform', expandedGoalCluster);
                    }
                })
                .on('mouseleave', function(){
                    goalsInGroup.transition().attr('transform', compactGoalCluster);
                });
        })
        .selectAll('.goal')
            .attr('transform', compactGoalCluster);

    dNewGoals
        .append('svg:circle')
        .attr('r', RADIUS);

    function addProbabilityLabel(dGoals) {
        var labels = dGoals.append('svg:g')
            .attr('class', 'probability')
            .attr('transform', translateXY(0.35 * RADIUS, 1.2 * -RADIUS));

        labels
            .append('svg:rect')
            .attr({
                rx: 3,      ry: 3,
                width: 22,  height: 20
            });

        labels
            .append('svg:text')
            .attr({
                x: 3,       y: 15
            })
            .text(function(d){
                return Math.round(d.probability * 100);
            });
    }

    addProbabilityLabel(dNewGoals);


    function goalTranslate(goalGroups) {

        var x = Math.round(visWin.x(goalGroups[0].date));

        return translateX(x);
    }

    function scaleTransform(isBig) {
        return translateXY(0, isBig? 0: RADIUS/2) + scale(isBig? 1: 0.5);
    }

    var scalers = dGoalGroups.selectAll('.scaler');

    function rescale(transition) {
        var target = transition? scalers.transition() : scalers;

        target.attr('transform', scaleTransform(isBig));

        container.classed('isBig', isBig);
    }

    function zoomedIn() {
        return (visWin.timeDensity() > densityBoundary);
    }

    function fixSizesAndTraslate() {
        var bigNow = zoomedIn();

        if( isBig != bigNow ) {
            isBig = bigNow;
            rescale(true);
        }

        dGoalGroups.attr('transform', goalTranslate);
    }

    var isBig = zoomedIn();
    rescale(false);
    return fixSizesAndTraslate;
};