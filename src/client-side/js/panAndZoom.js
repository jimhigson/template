var d3 = require('d3');
var pairExtent = require('./pairs.js').pairExtent;

module.exports = function panAndZoom(element, sliderElement, visWin, model) {


    var fullDateRange = d3.extent(model.series, function (d) {
        return d.date;
    });
    var fullTimeExtend = pairExtent(fullDateRange);
    var originalTimeExtent = visWin.timeExtent();

    var minScale = originalTimeExtent / fullTimeExtend * 0.8;
    var maxScale = minScale * 18 / 0.8;

    sliderElement.attr('min', minScale);
    sliderElement.attr('max', maxScale);

    var zoom = d3.behavior.zoom()
        .scaleExtent([minScale, maxScale])
        .on('zoom', function() {
            updateSlider();
        });

    function updateSlider() {
        var newZoomScale = originalTimeExtent/ visWin.timeExtent();

        sliderElement.val(newZoomScale);
    }

    sliderElement.on('input', function(){

        var timeCentre = visWin.timeCentre();

        zoom.scale(sliderElement.val());

        visWin.centreOnTime(timeCentre);
    });

    zoom.x(visWin.x);

    element.call(zoom);
};