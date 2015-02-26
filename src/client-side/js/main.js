console.log('the js is running');

$(function() {

    requestSimulationData(function(data){
        var windowWidth = $(window).width();
        chartView(document.getElementById('mainChart'), windowWidth, 400, data);
    });
});
