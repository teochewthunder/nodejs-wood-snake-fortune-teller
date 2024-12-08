var api = require("./api.js");
var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(require("body-parser")());

app.get("/", (req, res)=> {
	res.render("form", { error: "test", fortune: "To get your fortune in the year 2025, please provide your birth date." });
});

app.post("/fortune", (req, res)=> {
	res.render("form", { error: "test2", fortune: "" });
});

app.use((req, res, next)=> {
	res.status(404);
	res.render("404");
});

app.use((err, req, res, next)=> {
	res.status(500);
	res.render("500", { errorMessage: err.code });
});

app.listen(app.get("port"), ()=> {

});