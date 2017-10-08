const TwitterPackage = require("twitter");
const fetch = require("node-fetch");
const unirest = require("unirest")

const config = require('./config');
var Twitter = new TwitterPackage(config.tweeterConfig);

function getRandomJoke(callback) {
    unirest.get("https://icanhazdadjoke.com/")
        .headers({ 'Accept': 'application/json' })
        .end(function (response) {
            if (response.error) {
                console.log("Error grabbing joke :(")
                callback(response.error, null);
            } else {
                callback(null, response.body.joke);
            }
        });
}

function sendPostBack() {
    getRandomJoke(function (error, joke) {
        Twitter.post('statuses/update', { status: "@CusePotholes " + joke }, function (error, tweet, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Tweet successfully sent!");
            }
        });
    });
}

Twitter.stream('statuses/filter', { follow: "916738528054214656" },
    function (stream) {
        stream.on('data', function (tweet) {
            if (tweet.text.includes("@the_annoy_bot")) {
                sendPostBack();
            }
        });
        stream.on('error', function (error) {
            console.log('error found', error);
        });
    });