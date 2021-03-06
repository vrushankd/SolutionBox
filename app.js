
/**
 * Module dependencies.
 */
 var express = require('express')
 , routes = require('./routes')
 , search = require('./routes/search')
 , twitter = require('./routes/twitter')
 , http = require('http')
 , path = require('path');

 var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/viewsearch', search.viewsearch);
app.get('/search', search.displaysearch);
app.get('/analysis', search.analysis);
app.get('/allanswers/:qid', search.allanswers);
app.get('/bestanswer/:id', search.bestanswer);
app.get('/twitter', twitter.twitteranswers);
app.get('/viewsearch', search.viewsearch);
app.get('/tags', search.tags);


// Error Handling
// app.use(function(req, res, next){
// 	res.status(404);


//   // respond with html page
//   if (req.accepts('html')) {
//   	res.render('invalid');
//   	return;
//   }

//   // respond with json
//   if (req.accepts('json')) {
//   	res.send({ error: 'Not found' });
//   	return;
//   }

//   // default to plain-text. send()
//   res.type('txt').send('Not found');
// });

app.use(function(req, res) {
	res.status(404);
	res.render('invalid');
});

  // Handle 500
  app.use(function(error, req, res, next) {
  	res.status(500);
  	res.render('invalid');
  });



  http.createServer(app).listen(app.get('port'), function(){
  	console.log('Express server listening on port ' + app.get('port'));
  });