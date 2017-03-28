
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
    , todoModel = require('./models/todo')
    ,todoRoute = require('./routes/todo');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var uriString =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/HelloMongoose';

mongoose.connect('mongodb://kuofinalproject:vs0gZ5bHQ16vrhDkZsmorqNsaXLk5n8TPYWJ0e0vGh24urvAoQDqPl4veLS2JgMw7QIbQ5fAfNR0UxLrYqvtMg==@kuofinalproject.documents.azure.com:10250/?ssl=true');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('Successfully mongodb is connected');
});

app.get('/todo',todoRoute.index);
app.get('/todo/:id',todoRoute.findById);
app.put('/todo/:id',todoRoute.update);
app.delete('/todo/:id',todoRoute.delete)
app.post('/todo',todoRoute.newTodo);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});