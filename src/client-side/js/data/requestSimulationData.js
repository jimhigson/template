function requestSimulationData(callback) {

    oboe('sample_forecast.json')
        .node({
            'date': function(dateString){
                var parts = dateString.split('-');
                return new Date(parts[0], parts[1]);
            },
            'goalsByDate.*.*': function(goal, path, ancestors) {
                goal.dateGroup = ancestors[ancestors.length -2];
                goal.indexInDate = _.last(path);
            }
        })
        .done(callback)
        .fail(function(e){
            console.log(e);
        });
};