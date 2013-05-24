
var mongoose;
var chartSchema;
var chart;

exports.initialize = function(mongo) {
    mongoose = mongo;
    mongoose.connect('mongodb://localhost/pie-charter');

    //chart schema 
    chartSchema = new mongoose.Schema({
        author: String,
        title: String,
        chart: mongoose.Schema.Types.Mixed
    });

    //chart model
    chart = mongoose.model('Chart', chartSchema, 'chart', false);

};

exports.getChart = function() {
    return chart;
};