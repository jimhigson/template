function panAndZoom(element, visWin, zoomCallback) {

    var zoom = d3.behavior.zoom()
      .scaleExtent([1, 18])
      .on('zoom', zoomCallback);

    zoom.x(visWin.x);

    element.call(zoom);
}