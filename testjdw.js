var express = require('express');
var mysql = require('mysql');

var app = express();


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'freedombear',
	password : 'freedombear',
	database: 'freedombear'
});

connection.connect(function(error){

	if(!!error){
		console.log('Error');
	}else{
		console.log('Connected');
	}
});

app.get('/',function(req,resp){
	connection.query("insert into User(id,password,name,point,job,contact) values ('user2','user2','user2',0,'normal','01012341234');", function(error,rows,fields){
		if(!!error){
			console.log('Error in the query');
		}else{
			console.log('Successful query');

		}
	});
})
app.listen(3000);