$(document).ready(function(){
	"use strict"
	var endpoint = "http://localhost:3000/tasks"
	$.ajax(ENDPOINT, {
		method: "GET",
		dataType: "json"
	}).then(function(response){
		console.log(response)
	})
});