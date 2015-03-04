var oboe = require('oboe');
var _ = require('lodash');

module.exports = function requestSimulationData(eventBus) {

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
        .done(function(model){
            eventBus.emit('dataLoaded', model);
        })
        .fail(function(e){
            console.log(e);
        });
};