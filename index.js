//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    // console.log(req.body.crypto);
    // console.log(req.body.fiat);
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    // var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat;

    // console.log(url);
    // request(url , function(error, responce, body) {
    //
    //     var data = JSON.parse(body);
    //     var price = data.last;
    //
    //     var currentData = data.display_timestamp;
    //
    //     var str = "Price of " + crypto  + ": " + price + " " + fiat;
    //
    //     res.write("<p>The current data is " + currentData + "</p>");
    //     res.write("<h1>" + str + "</h1>");
    //     res.send();
    // });

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount,
        }
    };

    request(options , function(error, responce, body) {

        var data = JSON.parse(body);
        var price = data.price;

        var currentData = data.time;

        var str = "Price of " + amount + " " + crypto  + " is " + price + " " + fiat;

        res.write("<p>The current data is " + currentData + "</p>");
        res.write("<h1>" + str + "</h1>");
        res.send();
    });

});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});
