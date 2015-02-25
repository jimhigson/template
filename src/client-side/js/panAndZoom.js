function panAndZoom(element, sliderElement, visWin, zoomCallback) {

    function actionZoom(){
        zoomCallback();
    }

    var originalTimeExtent = visWin.timeExtent();

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 18])
        .on('zoom', function() {
            var newZoomScale = originalTimeExtent/ visWin.timeExtent();

            sliderElement.val(newZoomScale);

            actionZoom();
        });

    sliderElement.change(function(){

        var timeCentre = visWin.timeCentre();

        zoom.scale(sliderElement.val());

        visWin.centreOnTime(timeCentre);

        actionZoom();
    });

    zoom.x(visWin.x);

    element.call(zoom);
}