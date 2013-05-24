
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    http = require('http'),
    path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/pie-charter');


var ChartSchema = new mongoose.Schema({
    author: String,
    title: String,
    info: String
});

//chart model
Chart = mongoose.model('Chart', ChartSchema, 'chart', false);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Home Page
app.get('/', function(req, res) {
  res.render('home');
});

//Author list
app.get('/authors', function(req, res) {
  Chart.find({}, function(err, results) {

    var authorList = [];
    var authorObj = {};

    for (var i = 0; i < results.length; i++) {
      if (authorObj[results[i].author] !== true) {
        authorObj[results[i].author] = true;
        authorList.push(results[i].author);
      }
    }

    res.render('authors/index', {list: authorList});
  });
});

app.param('authorId', function(req, res, next, authorId) {
  Chart.find({author: authorId}, function(err, result) {
    req.charts = result;
    console.log(JSON.stringify(req.charts));
    next();
  });
});

//Author Charts
app.get('/authors/:authorId', function(req, res) {
  res.render('authors/list', {list: req.charts, author: req.params.authorId});
});


//Chart Index
app.get('/charts', function(req, res) {
  Chart.find({}, function(err, results) {
    res.render('charts/index', {charts: results});
  });
});

//Chart New
app.get('/charts/new', function(req, res) {
  res.render('charts/new');
});

//Chart Create
app.post('/charts', function(req, res) {
  console.log('Info: ' + req.body.chartInfo);
  new Chart({
    author: req.body.chartAuthor,
    title: req.body.chartTitle,
    info: req.body.chartInfo
  }).save(function(err, result) {
    if (err) {
      res.json(err);
    }
    res.redirect('/charts/' + result._id);
  });
});

app.param('chartId', function(req, res, next, chartId) {
  Chart.findOne({_id: chartId}, function(err, result) {
    req.chart = result;
    next();
  });
});

//Chart Show
app.get('/charts/:chartId', function(req, res) {
  res.render('charts/show', {chart: req.chart});
});

//Chart Edit
app.get('/charts/:chartId/edit', function(req, res) {
  res.render('charts/edit', {chart: req.chart});
});

//Chart Update
app.put('/charts/:chartId', function(req, res) {
  Chart.update(
  {
    _id: req.params.chartId
  },
  {
    title: req.body.chartTitle,
    author: req.body.chartAuthor,
    info: req.body.chartInfo
  }, function(err) {
    res.redirect('/charts/' + req.params.chartId);
  });
});

//Chart Delete
app['delete']('/charts/:chartId', function(req, res) {
  Chart.remove({_id: req.params.chartId}, function(err) {
    res.redirect('/charts');
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


















