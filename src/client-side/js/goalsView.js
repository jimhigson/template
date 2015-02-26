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
                .attr('goal-quantity', function(d){
                    return d.length;
                })
                .classed('multiple-goals', function(d){
                    return d.length > 1;
                });

    var dNewGoals = dGoalGroups
        .append('svg:g')
            .attr('class', 'scaler')
                .selectAll('.goal')
                .data(function(goalArrayForDate){return goalArrayForDate})
                    .enter()
                        .append('svg:g')
                            .attr('class', 'goal');

    dNewGoals
        .filter(function(d) {
            return d.dateGroup.length > 1;
        })
        .attr('transform', function(d, i){
            var numberOfGoals = d.dateGroup.length;

            var scaleFactor = Math.pow(0.85, numberOfGoals -1);

            var angle = i * (Math.PI * 2)/numberOfGoals + Math.PI;

            var offsetFromCentre = RADIUS * 0.8;
            var x = offsetFromCentre * Math.sin(angle);
            var y = offsetFromCentre * Math.cos(angle);

            return scale(scaleFactor) + translateXY(x,y);
        });

    dNewGoals
        .append('svg:circle')
        .attr('r', RADIUS);

    function addProbabilityLabel(dGoals) {
        var labels = dGoals.append('svg:g').attr('class', 'probability');

        labels
            .append('svg:rect')
            .attr({
                rx: 3,
                ry: 3,
                x: 4,
                y: -25,
                width: 22,
                height: 20
            });

        labels
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
        return scale(isBig? 1: 0.5);
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