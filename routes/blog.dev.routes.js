const express     = require('express'),
    router        = express.Router();

const Article = require("../models/Article") 

const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../static"),
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Unique file name
    }
  });
  
  const upload = multer({ storage });

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
  preview: preview
  } = req.body;
  
 try {
    console.log('Files:', req.files); // Uploaded files
    if(req.files.length > 0)
    {
        //for now images cannot contain spaces
        image_name = `assets/${req.files[0].filename}`;
        Article.create({
            title: title, 
            description: dsc, 
            content: content,
            image: image_name,
            preview: preview
           }) 
        res.send({message:"Article created successfully, image upload successful"})
         
    }else{
       Article.create({
        title: title, 
        description: dsc, 
        content: content,
        preview: preview
       }) 
       res.send({message:"Article created successfully"})
    }

 } catch (error) {
    console.log(error)
    res.send({error})
 }
}

router.get('/getArticles', getArticles);
router.post('/addArticle', upload.any(), addArticle)
router.get('/getArticle/:id', getArticle);


module.exports = router;
