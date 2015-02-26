function goalsView(container, visWin, goalGroups) {

    var RADIUS_LARGE = 19;
    var RADIUS_SMALL = 10;

    var yOffset = visWin.height - RADIUS_LARGE;
    container.attr('transform', translateXY(0, yOffset));

    var densityBoundary = 9;
    var isBig = false;

    var dGoalGroups = container
        .selectAll('.goalGroup')
        .data(goalGroups)
        .enter()
            .append('svg:g')
                .attr('class', 'goalGroup')
                .attr('data-goal-group', function(d, i){
                    return i;
                })
                    .selectAll('.goal')
                    .data(function(d){console.log(d); return d;})
                    .enter()
                        .append('svg:g')
                            .attr('class', 'goal');

    var circles = dGoalGroups
        .append('svg:circle')
        .attr('r', radius());

    function addProbabilityLabel(dGoalGroups) {
        dGoalGroups
            .append('svg:rect')
            .attr({
                rx: 3,
                ry: 3,
                x: 4,
                y: -25,
                width: 22,
                height: 20
            });

        dGoalGroups
            .append('svg:text')
            .attr({
                x: 8,
                y: -10
            })
            .text(function(d){
                return Math.round(d.probability * 100);
            });
    }

    addProbabilityLabel(dGoalGroups);

    var goals = container.selectAll('.goal');

    function radius() {
        return isBig? RADIUS_LARGE : RADIUS_SMALL;
    }

    function goalTranslate(goal) {
        var x = Math.round(visWin.x(goal.date));

        return translateX(x);
    }

    return function() {
        var bigNow = (visWin.timeDensity() > densityBoundary);

        if( isBig != bigNow ) {
            isBig = bigNow;

            circles.transition().attr('r', radius());
            container.classed('isBig', isBig);
        }

        goals.attr('transform', goalTranslate);
    };
}