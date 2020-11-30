const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

//set view engine
app.set("view engine", "ejs");
//save views in current directory
app.set("views", __dirname + "/view");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//port,for dev 1234
app.listen(process.env.PORT || 1234);
