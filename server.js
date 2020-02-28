console.log("server is starting");

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var util = require('util');
var fs = require('fs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.text());

function listening(){
    console.log("listening...");
}

var server = app.listen(process.env.PORT ||3000, listening);

app.get('/getArtist', (req, res) => {
    var data = fs.readFileSync('./artist.json');
    var obj = JSON.parse(data);
    res.send(obj);
})


app.post('/addArtist', (req, res) => {
    var data = req.body;
    console.log(data);
    fs.writeFileSync("./artist.json", JSON.stringify(data));
    res.send(); 
    
});