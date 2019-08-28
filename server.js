const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();
const searchRouter = require('./routes/search_news');
const indexRouter = require('./routes/index');
const similarityRouter = require('./routes/similarity_news');

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/search',searchRouter);
app.use('/',indexRouter);
app.use('/similarity',similarityRouter);

// Run the server 
app.listen((process.env.PORT || 8000), function () {
	console.log("Server is up and running...");
});

