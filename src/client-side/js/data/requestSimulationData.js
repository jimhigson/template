function requestSimulationData(callback) {

    oboe('sample_forecast.json')
        .node('date', function(dateString){
            var parts = dateString.split('-');
            return new Date(parts[0], parts[1]);
        })
        .done(callback)
        .fail(function(e){
            console.log(e);
        });
};