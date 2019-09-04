if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();
const searchRouter = require('./routes/search_news');
const indexRouter = require('./routes/index');
const similarRouter = require('./routes/similar_news');
const aboutRouter = require('./routes/about');

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
app.use('/similar',similarRouter);
app.use('/about',aboutRouter);

// Run the server 
app.listen((process.env.PORT || 8000), function (e) {
	if(e){
		throw new Error('Internal server error');
	}
	console.log("Server is up and running...");
});


