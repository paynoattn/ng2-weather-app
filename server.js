/* 
  Server File
  overstock bot front end demo
  (c) 2016 Overstock.com.
  All rights reserved.
  >_>
  You shouldn't even be looking at this, crepper.
*/

var express = require('express');
var app = express();
var morgan = require('morgan');                                   // log requests to the console (express4)
var root = __dirname + '/www/'

console.log(app.get('env'));

if ( app.get('env') === 'development' ) {
  app.use(morgan('dev'));                                           // log every request to the console
  app.set('port', (process.env.PORT || 8080));
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(root));                      

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('*', function(req, res) {
    res.sendFile( root + 'index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
