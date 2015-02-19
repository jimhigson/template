function xAxisView(element, visWin) {

    var YEAR_ONLY_FORMAT = d3.time.format('%Y');
    var width = pairExtent(visWin.x.range());
    var numberMajorTicks = width / 100;
    var numberMinorTicks = width / 20;

    console.log('drawing x scale', visWin.x, 'as an axis on', element);

    var yRange = visWin.y.range();
    var yMin = yRange[0];
    var yMax = yRange[1];

    return function() {
        var majorTickValues = visWin.x.ticks(numberMajorTicks);
        var majorTicks = element
                            .select('.major')
                            .selectAll('.tick')
                            .data(majorTickValues);

        var minorTickValues = visWin.x.ticks(numberMinorTicks);
        var minorTicks = element
                            .select('.minor')
                            .selectAll('.tick')
                            .data(minorTickValues);

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

        minorTicks
            .attr('transform', tickTranslate);
        majorTicks
            .attr('transform', tickTranslate);

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

        majorTicks.selectAll('text')
            .text(YEAR_ONLY_FORMAT);

        majorTicks.exit().remove();
        minorTicks.exit().remove();
    }

}