const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const apiKey = "62d4690f0406a37b787fd8be4934041c";
    const query = req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){

        console.log("Status Code:", response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write("<h1>The weather in " + query + " today is " + temp + " degree celsius</h1>");
            // res.write("<h2>It is " + weatherDescription + "</h2>");
            // res.write("<img src=" + imageURL + ">");
            // res.write("<br>");
            // res.write("<br>");
            // res.write("<a href='/'>Back to home</a>");
            // res.send();


            res.render("result", {
                degree: temp,
                description: weatherDescription,
                city: query,
                image: imageURL
            });
        });        
    })
});

app.listen(process.env.PORT || port, function(){
    console.log("App is running on port " + port);
});