//web framework
const express = require("express");
//create basic app
const app = express();
//setting ejs as view engine
app.set("view engine", "ejs");
// tell express, app is using url parameters
app.use(express.urlencoded({ extended: false }));
// to connect to database
const mongoose = require("mongoose");

//App deploy or localhost mode connection to MongoDB
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import data model/ schema
const ShortUrl = require("./models/shortUrl");

//for web scraping task
const axios = require("axios");
var request = require("request");
const cheerio = require("cheerio");

const url = "https://fineartamerica.com/shop/canvas+prints/frog";

async function getHtml() {
  let res = await axios.get(url);
  console.log(getData(res.data));

  //return res.data;
}

let getData = (html) => {
  var data = [];
  const $ = cheerio.load(html);
  $("div.searchengineresultdiv").each((i, elem) => {
    data.push({
      image_title: $(elem).find("span.imageTitle").text(),
      artist_name: $(elem).find("span.artistName").text(),
      price: $(elem).find("p.productprice").text(),
    });
  });
  //console.log(data);
  // return data;
};

//for web scraping task end

//get
// index page with request and response parameters
// show all url from table "ShortUrl" in index page
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

// use cheerio to scrape url and store them
app.get("/scrape", function (req, res) {
  request(url, function (error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    $("div.searchengineresultdiv").each(function (i, elem) {
      image_title = $(elem).find("span.imageTitle").text();
      artist_name = $(elem).find("span.artistName").text();
      price = $(elem).find("p.productprice").text();
      // if these are present in the scraped data, create an article in the database collection
      if (image_title && artist_name && price) {
        ShortUrl.create(
          {
            image_title: image_title,
            artist_name: artist_name,
            price: price,
          },
          function (err, inserted) {
            if (err) {
              // log the error if one is encountered during the query
              console.log(err);
            } else {
              // otherwise, log the inserted data
              console.log(inserted);
            }
          }
        );
        // if there are 10 articles, then return the callback to the frontend
        console.log(i);
        if (i === 5) {
          //res.redirect("/");
          return res.sendStatus(200);
        }
      }
    });
  });
});

// start listening on specified port 4567
//can set as environment var
app.listen(process.env.PORT || 4567);
