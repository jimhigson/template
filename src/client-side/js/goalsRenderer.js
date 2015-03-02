var _ = require('lodash');

var translateX = require('./svgUtils.js').translateX;
var translateXY = require('./svgUtils.js').translateXY;
var scale = require('./svgUtils.js').scale;

var π = Math.PI, τ = 2 * π;

module.exports = function goalsView(container, visWin, goalsByDate) {

    var RADIUS = 24;
    var DENSITY_BOUNDARY = 9;

    /** align container's local origin with the origin of the y-axis */
    function initContainerOffset() {
        var yOffset = visWin.height - RADIUS;
        container.attr('transform', translateXY(0, yOffset));
    }

    function createPanesForOverpainting(sel){
        sel.each(function(d){
            var sel = d3.select(this);

            if(d.length > 1) {
                sel.append('g').attr('class', 'back');
                sel.append('g').attr('class', 'mid');
                sel.append('g').attr('class', 'front');
            } else {
                sel.append('g').attr('class', 'mid');
            }
        });

        return sel.selectAll('g');
    }

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

    var dNewGoals =
        createPanesForOverpainting(
            dGoalGroups
                .append('svg:g')
                    .attr('class', 'scaler')
        )
        .selectAll('.goal')
        .data(function(goalArrayForDate){return goalArrayForDate})
        .enter()
        .append('svg:g').attr('class', 'goal');

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

    addProbabilityLabel(container.selectAll('.goals .mid .goal'));

    function goalTranslate(goalGroups) {

        var x = Math.round(visWin.x(goalGroups[0].date));

        return translateX(x);
    }

    var scalers = dGoalGroups.selectAll('.scaler');

    function applyZoomToGoalGroup(groupsSelection, isLarge) {

        var yTranslate = isLarge ? 0 : RADIUS / 2;
        var scaleFactor = isLarge ? 1 : 0.5;
        var transform = translateXY(0, yTranslate) + scale(scaleFactor);

        groupsSelection.attr('transform', transform);

        container.classed('isBig', isLarge);
    }

    function visibleWindowIsZoomedIn() {
        return (visWin.timeDensity() > DENSITY_BOUNDARY);
    }

    function updateFrame() {
        var bigNow = visibleWindowIsZoomedIn();

        if( isBig != bigNow ) {
            isBig = bigNow;
            applyZoomToGoalGroup(scalers.transition(), isBig);
        }

        dGoalGroups.attr('transform', goalTranslate);
    }

    initContainerOffset();
    var isBig = visibleWindowIsZoomedIn();
    applyZoomToGoalGroup(scalers, isBig);
    return updateFrame;
};