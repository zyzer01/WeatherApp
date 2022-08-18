const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
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

            
            // .end(function(result){
            //     res.render("index", temp);
            // })
            

            res.write("<h1>The weather in " + query + " today is " + temp + " degree celcius</h1>");
            res.write("<h2>It is " + weatherDescription + "</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send();


        });
        
    })

});

app.listen(port, function(){
    console.log("App is running on port " + port);
});


// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");

// const app = express();

// const port = 3000;


// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", function(req, res){
    
//     res.sendFile(__dirname + "/index.html");

// });

// app.post("/", function(req, res){

//     const query = req.body.cityName;
//     const apiKey = "62d4690f0406a37b787fd8be4934041c";
//     const unit = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

//     https.get(url, function(response){
//         console.log("Status code:", response.statusCode);
        
//         response.on("data", function(data){
//             const weatherData = JSON.parse(data);
//             const temp = Math.floor(weatherData.main.temp);
//             const weatherDescription = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//             res.write("<p>The weather currently is " + weatherDescription + "</p>")
//             res.write("<h1> The temperature in " + query + " is " + temp + " degree celcius</h1>");
//             res.write("<img src=" + imageURL + ">");
//             res.send();
//         });
//     });

// });






// app.listen(port, function(){
//     console.log(`App is running on port ${port}`);
// });