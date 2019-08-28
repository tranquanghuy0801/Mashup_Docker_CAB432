const express = require('express')
const router = express.Router()
// Import news API 
const NewsAPI = require('newsapi');
// Imports the Google Cloud client library
const language = require('@google-cloud/language');
// Creates a client
const client = new language.LanguageServiceClient();
// Connect new API 
const newsapi = new NewsAPI('41dcf83144f54d559886b79caff9273e');

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
router.get('/',(req, res) => {
	newsapi.v2.topHeadlines({
		country: req.params.id,
		language: 'en'
	}).then(async (response) => {
		let responseToSend;
		if (response.status == 'ok' && response.articles.length > 0) {
			//console.log(response.articles.length)
			articles = parseArticles(response);
			const results = await Promise.all(articles);
			
			topHeadlines = {
					"articles": results.slice(1,10),
					"status": "ok"
				/*
				"messages": [
					{
						"attachment": {
							"type": "template",
							"payload": {
								"template_type": "generic",
								"image_aspect_ratio": "square",
								"elements": results.slice(0, 10)
							}
						}
					}
				]
				*/
			};
			
			res.render('search_form',{topHeadlines : topHeadlines});
			//return res.json(topHeadlines);
			
		}
		
		else {
			res.render('search_form',{topHeadlines : ''})
		}
	}).catch(err => console.log(err));
});

// Parse the list of articles from the response 
function  parseArticles(response){
	const articles = response.articles.map(async article => {
		
		let content;
		if(article.content !== null ){
			if(article.content.split(" ").length >= 20){
				content = await predict_content(article.content);
			}
			else{
				content = "";
			}
			if(Object.entries(content).length !== 0){
				return {
					"title": article.title,
					"image_url": article.urlToImage,
					"subtitle": article.description,
					"content": content,
					"url": article.url
				}
			}
		}
	})
	return articles;
}

// Function to predict the label of each news content 
async function predict_content(text) {
	// Imports the Google Cloud client library
	const language = require('@google-cloud/language');
  
	// Instantiates a client
	const client = new language.LanguageServiceClient();
  
	const document = {
	  content: text,
	  type: 'PLAIN_TEXT',
	};
	let content_labels = {};
  
	// Detects the sentiment of the text
	try{
		const [classification] = await client.classifyText({document: document});
		if(classification.categories == undefined){
			return '';
		}
		else{
			classification.categories.forEach(category => {
				console.log(`Name: ${category.name}`);
				content_labels[category.name] = category.confidence
			});
			return content_labels;
		}
	}
	catch (err){
		console.log(err);
		return '';
	}
  
}

module.exports = router;