function goalView(sel, visWin, goalGroups) {

    var RADIUS = 19;

    var dGoalGroups = sel
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

    dGoalGroups
        .append('svg:circle')
        .attr('r', RADIUS);

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

    var goals = sel.selectAll('.goal');

    function goalTranslate(goal) {
        var x = Math.round(visWin.x(goal.date));
        var y = visWin.height - RADIUS;
        return translateXY(x, y);
    }

    return function() {
        goals.attr('transform', goalTranslate);
    };
}