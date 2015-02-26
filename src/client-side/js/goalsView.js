function goalsView(container, visWin, goalsByDate) {

    var RADIUS = 19;

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
                .attr('goal-number', function(d, i){
                    return d.length;
                })

    var dNewGoals = dGoalGroups
        .append('svg:g')
            .attr('class', 'scaler')
                .selectAll('.goal')
                .data(function(goalArrayForDate){return goalArrayForDate})
                .enter()
                    .append('svg:g')
                        .attr('class', 'goal');

    dNewGoals
        .append('svg:circle')
        .attr('r', RADIUS);

    function addProbabilityLabel(dGoals) {
        dGoals
            .append('svg:rect')
            .attr({
                rx: 3,
                ry: 3,
                x: 4,
                y: -25,
                width: 22,
                height: 20
            });

        dGoals
            .append('svg:text')
            .attr({
                x: 8,
                y: -10
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
        var scale = isBig? 1: 0.5;
        return 'scale(' + scale + ')';
    }

    var scalers = dGoalGroups.selectAll('.scaler');

    function rescale(transition) {
        var target = transition? scalers.transition() : scalers;

        target.attr('transform', scaleTransform(isBig));

        container.classed('isBig', isBig);
    }

    function fixSizesAndTraslate() {
        var bigNow = (visWin.timeDensity() > densityBoundary);

        if( isBig != bigNow ) {
            isBig = bigNow;
            rescale(true);
        }

        dGoalGroups.attr('transform', goalTranslate);
    }

    var isBig = false;
    rescale(false);
    return fixSizesAndTraslate;
}