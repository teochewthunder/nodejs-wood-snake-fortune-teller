var api = require("./api.js");
var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(require("body-parser")());
app.use(express.static("img"));

app.get("/", (req, res)=> {
	res.render("form", { error: "", fortune: "To get your fortune in the year 2025, please provide your birth date." });
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
		"content" : "It is currently 2025. My birth date is " + req.body.txtBd + ". Using exactly 5 paragraphs give me my Chinese Zodiac and element I also want a personality profile for myself. Lastly, provide a fortune for love, money and health."
	}
	messages.push(obj);

	var body = {
		"model": "gpt-3.5-turbo",
		"messages" : messages,
		"max_tokens" : 2500
	}

	fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: headers,
		body: JSON.stringify(body)
	})
	.then(response => response.text())
	.then(data => { 
		var json_data = JSON.parse(data);
		console.log(json_data.choices);
		var html_content =  json_data.choices[0].message.content.replaceAll("\n\n", "<br /><br />");
		res.render("form", { error: "", fortune: html_content });
	})
	.catch(err => {
		res.render("form", { error: err, fortune: "" });
	});
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