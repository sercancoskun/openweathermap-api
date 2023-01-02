
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const cityName = req.body.city;    
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=51d42fce4df735e99adf6cc08fb7a43f&units=metric", (response) => {
        response.on("data", (d) => {
            const weatherData = JSON.parse(d);
            const weatherText = weatherData.weather[0].main;
            const weatherTemp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;

            res.write("<h1>The weather in " + cityName + " is: " + weatherText + " (" + weatherTemp + " C)</h1>");

            res.write("<img src='https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'>");

            res.write("<p>The city has a " + weatherDesc + "</p>");

            res.send();
         
        });
          
    });
    
});

app.listen(3002, function(){
    console.log("Listening port 3002.");
});