const express     = require('express'),
    router        = express.Router();

const Article = require("../models/Article") 

//get all
async function getArticles(req, res){
 try{
    const _articles = await Article.find({});
    res.send(_articles)
 }catch(e){
    res.send({e})
}}

//get one
async function getArticle(req, res) {
    let { id } = req.params; // Extract _id from URL params
    try {
        const _article = await Article.findOne({ _id: id });
        if (!_article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(_article);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

//add one
async function addArticle(req, res){
 let { 
  title: title, 
  description: dsc, 
  content: content,
  image: image } = req.body;
 
 try {
  /*
  Image upload with multer and path under construction
  For now console.log(req.body) to see data
  */
  console.log("image", req.body.image)
     
  Article.create({
   title: title, 
   description: dsc, 
   content: content, 
  })
  res.send({message: 'Article added successfully'})
 } catch (error) {
    console.log(error)
    res.send({error})
 }
}

router.get('/getArticles', getArticles);
router.get('/getArticle/:id', getArticle);
router.post('/addArticle', addArticle);


module.exports = router;
