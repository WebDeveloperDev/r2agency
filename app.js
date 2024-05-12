var express = require('express');
var bodyParser = require('body-parser');
var routes_index = require('./routes/index.js');
var routes_account = require('./routes/account.js');
var app = express();

// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// To parse JSON data
app.use(bodyParser.json());
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set the directory to serve HTML files from
app.use(express.static('views'));

// Routes
app.use('/', routes_index);
app.use('/account', routes_account);

// Handling invalid routes
app.get('*', function(req, res) {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

app.post('*', function(req, res) {
    res.status(500).sendFile(__dirname + '/views/500.html');
});

// Start the server
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
