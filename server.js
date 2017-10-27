
var express = require("express");
var cors = require('cors');
var fs = require("fs");
var results=require("./graph.json");

var app = express();
app.use(cors({
	origin: "*",
	methods: ['GET', 'POST'],
	alloweHeaders: ['Conten-Type', 'Authorization']
}));
app.use(express.static('public'));
app.get("/audio", function(req, res) {
	var page=req.query.page;
	var arr=[]
	for(let i=0;i<page*6;i++){
		arr.push(results[i]);
	}
	res.json(arr);
})
var server = app.listen(3000, function() {
	console.log('listening at 3000');
});