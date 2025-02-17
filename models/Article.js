const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  content: {type: String, required: true},
  image: {type: String, required: false}, // Store image path
})

module.exports = mongoose.model("Article", ArticleSchema)
