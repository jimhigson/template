console.log('the js is running');

$(function() {

    oboe('sample_forecast.json')
        .node('date', function(dateString){
            var parts = dateString.split('-');
            return new Date(parts[0], parts[1]);
        })
        .done(function(json){
            chartView(document.getElementById('mainChart'), 900, 400, json);
        }).fail(function(e){
            console.log(e);
        });
});
