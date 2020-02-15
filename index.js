var express = require("express");
var path = require('path');

//CORS HERRE
//var routes = require("./routes/routes.js");
var app = express();

//routes(app);

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = 4000;

app.listen(port, function () {
    console.log("App running on Port: " + port);
});