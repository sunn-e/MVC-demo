//to connect to mongodb
const mongoose = require("mongoose");

// to create short identifier
//has .generate() function that we will pass to shorturl as default
//const shortId = require("shortid");

//db schema
// | image_title | artist_name | price |
const shortUrlSchema = new mongoose.Schema(
  {
    image_title: {
      type: String,
      required: true,
      default: 0,
    },
    artist_name: {
      type: String,
      required: true,
      //default: shortId.generate,
      default: 0,
    },
    price: {
      type: String,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

//var mySchema = new mongoose.Schema( {name: String}, {timestamps: true} );

//now exporting this to hook model with database
// model name, schema name
module.exports = mongoose.model("shortUrl", shortUrlSchema);
