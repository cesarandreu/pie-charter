
var Chart;

exports.initialize = function(chartModel) {
    Chart = chartModel;
};

exports.get = function(req, res) {
    Chart
        .find()
        .exec(function(err, result) {
            if (err) {
                console.log('Error: ' + err);
            }

            console.log('Result: ' + JSON.stringify(result));

            res.render('home', {result: result});

        });
};