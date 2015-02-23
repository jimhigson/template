console.log('the js is running');

$(function() {

    oboe('sample_forecast.json')
        .node('date', function(dateString){
            var parts = dateString.split('-');
            return new Date(parts[0], parts[1]);
        })
        .done(function(json){
            var windowWidth = $(window).width();
            chartView(document.getElementById('mainChart'), windowWidth, 400, json);
        }).fail(function(e){
            console.log(e);
        });
});
