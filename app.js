var express = require('express');
var path = require('path');
const http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const facade = require("./dbFacade");
const pretty = require('express-prettify');


const client = require("mongodb").MongoClient;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pretty({query: 'pretty'}));


app.use('/', index);
app.use('/users', users);

const server = http.createServer(app);

server.listen("3000", function (err)
{
    if (!err)
    {
        console.log("lytter på port 3000!");

        // facade.getUserWhoLinkTheMost(10, function (docs)
        // {
        //     console.log("her er de user der linker flest users \n");
        //     console.log(docs);
        //     console.log("\n");
        // });
        //
        // facade.getNumberOfUniqueUsers(function (users)
        // {
        //     console.log("her er antal unique users \n ANTAL USERS: " + users);
        //     console.log("\n");
        // });
        //
        // facade.mostMentionedUser(5, function (users)
        // {
        //     console.log("her er most mentioned users \n");
        //     console.log(users);
        //     console.log("\n");
        // });
        //
        // facade.mostActiveUsersByPostCount(10, function (users)
        // {
        //     console.log("her er mest aktive users \n");
        //     console.log(users);
        //     console.log("\n");
        // });


    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
