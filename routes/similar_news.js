const express = require('express')
const router = express.Router()
// Import news API 
const NewsAPI = require('newsapi');
// Connect new API 
const newsapi = new NewsAPI('41dcf83144f54d559886b79caff9273e');

router.get('/:country/:category',(req,res)=> {
    newsapi.v2.topHeadlines({
        country: req.params.country,
        category: req.params.category,
		language: 'en'
	}).then( response => {
        let topHeadlines;
        if(response.status == 'ok' && response.articles.length > 0){
            topHeadlines = {
                "articles": response.articles.slice(1,20),
                "status": "ok"
            };

            res.render('similar_form',{topHeadlines: topHeadlines,
                country: req.params.country, category: req.params.category})
        }
        else{
            res.render('similar_form',{topHeadlines: ''})
        }
    }).catch( err => { console.log(err);})
    
})

module.exports = router;