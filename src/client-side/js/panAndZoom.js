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
        var timeCentre = visWin.x.invert(visWin.width/2);

        console.log('before zoom centred on timeCentre', visWin.x.invert(visWin.width/2));

        zoom.scale(sliderElement.val());

        visWin.centreOnTime(timeCentre);

        actionZoom();

        console.log('after zoom centred on timeCentre', visWin.x.invert(visWin.width/2));
    });

    zoom.x(visWin.x);

    element.call(zoom);
}