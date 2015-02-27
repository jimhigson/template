var d3 = require('d3');
var pairExtent = require('./pairs.js').pairExtent;

module.exports = function panAndZoom(element, sliderElement, visWin, zoomCallback) {

    function actionZoom(){
        zoomCallback();
    }

    var fullTimeExtend = pairExtent(visWin.fullDateRange);
    var originalTimeExtent = visWin.timeExtent();

    var minScale = originalTimeExtent / fullTimeExtend * 0.8;
    var maxScale = minScale * 18 / 0.8;

    sliderElement.attr('min', minScale);
    sliderElement.attr('max', maxScale);

    var zoom = d3.behavior.zoom()
        .scaleExtent([minScale, maxScale])
        .on('zoom', function() {
            updateSlider();

            actionZoom();
        });

    function updateSlider() {
        var newZoomScale = originalTimeExtent/ visWin.timeExtent();

        sliderElement.val(newZoomScale);
    }

    sliderElement.on('input', function(){

        var timeCentre = visWin.timeCentre();

        zoom.scale(sliderElement.val());

        visWin.centreOnTime(timeCentre);

        actionZoom();
    });

    zoom.x(visWin.x);

    element.call(zoom);
};