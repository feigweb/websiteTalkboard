const express = require('express');
const app=express();
const PORT=8080;

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})
app.listen(PORT, ()=>{
    console.log("Running on port 8080");
});