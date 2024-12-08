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
	let fetch = require("node-fetch");

	var headers = {
		"Authorization": "Bearer " + api.key,
		"OpenAI-Oganization": api.org,
		"Content-Type": "application/json"		
	};

	var messages = [];
	var obj = {
		"role": "user",
		"content" : "It is currently 2025. My birth date is " + req.body.txtBd + ". Using exactly 5 paragraphs give me 1) my Chinese Zodiac and element; 2) a personality profile for myself, and; 3) a fortune for love, money and health."
	}
	messages.push(obj);

	var body = {
		"model": "gpt-3.5turbo",
		"messages" : messages,
		"max_tokens" : 2500
	}

	fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: headers,
		body: body
	}).then(response => {
		console.log(response);
	}).catch(err => {
		console.log(err);
	});

	res.render("form", { error: "test2", fortune: req.body.txtBd });
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