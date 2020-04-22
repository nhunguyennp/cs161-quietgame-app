console.log("server.js is running");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb+srv://phoenix:mongophoenix@quietgame-records-8qun2.mongodb.net/test?retryWrites=true&w=majority";
// body-parser extraxts data from the form element
// and add them to the body property of the 
// request object
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function() {
	console.log("listening on 3000");
});

MongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {
	console.log("connected to database");
	const db = client.db('quietgame');
	recordsCollection = db.collection('records');

	app.set('views', __dirname + '/public/views');

	app.set('view engine', 'ejs');

	app.get('/record', (req, res) => {
	recordsCollection.find().sort({time: 1}).limit(10).toArray()
	.then(records => {
		res.render('records', { records: records })
		console.log(records);
	})
		.catch(error => console.error(error));
	});

	app.post('/record', (req, res) => {
	recordsCollection.insertOne(req.body)
	.then(result => {
		console.log(result);
		res.redirect('/record');
	})
	.catch(error => console.error(error));
});

	
	
})
.catch(error => console.error(error));

