console.log('the js is running');

$(function() {

    oboe('sample_forecast.json')
        .done(function(json){
            chartView(document.getElementById('mainChart'), 900, 400, json);
        });



});
