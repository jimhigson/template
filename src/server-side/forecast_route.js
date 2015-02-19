
var oboe = require('oboe'),
    fs = require('fs');

module.exports = function(app) {

    var responseJson = {
        series:[],
        goalGroups:[]
    };

    var percentiles = [10,30,50,70,90];

    oboe(fs.createReadStream(__dirname + '/json/response_body.json'))
        .node({
            'goals.*.id': function(id){
                var groupIndex = id - 1;
                responseJson.goalGroups[groupIndex] = responseJson.goalGroups[groupIndex] || [];
            },
            'goals.*': function(goal){
                var groupIndex = goal.id - 1;
                responseJson.goalGroups[groupIndex].push(goal);
            },
            'dates.*': function(date) {
                responseJson.series.push({
                    date: date,
                    percentiles: {}
                });
            },
            'percentiles.*.*': function(amount, path) {
                var i = path[2];
                var percentile = percentiles[path[1]];
                var amountScaled = amount/100;

                responseJson.series[i].percentiles[percentile] = amountScaled;
            }
        })
        .done(function(){
            console.log('created nicely formatted json');
        });

    app.get('/sample_forecast.json', function (req, res) {
       res.send(responseJson);
    });
};