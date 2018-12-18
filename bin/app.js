let express = require("express");
let app = express();
let path = require("path");


app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");


let bodyParse = require("body-parser");
app.use(bodyParse());

app.use(express.static(path.join(__dirname, "../public")));

let router = require("../router/index.js");
app.use("/", router)

let server = app.listen(3565, () => {
    console.log(`Server started on port`);
});