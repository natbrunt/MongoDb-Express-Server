
const express =
require('express')
require('dotenv').config();
const app = express()
const path = require("path");
const multer = require("multer");

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const cors = require('cors')
app.use(cors());

// Set up multer to store files in the "static" folder
const storage = multer.diskStorage({
  destination: path.join(__dirname, "static"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  }
});

const upload = multer({ storage });


mongoose = require('mongoose');
mongoose.set('debug',true)
mongoose.set('strictQuery',false);

async function connecting(){
  try {
    await mongoose.connect(process.env.MONGO), console.log('Connected to the MongoDb')
  }
  catch ( error ){
    console.log('ERROR: .envs are missing or failed to use mongoose connect ');
    console.log(error)
  }
}connecting()

app.get('/', (req, res) => {
  res.send({ok:true, message:"Mongoose-Express server is running. Images are available at /assets/your-image.jpg"})
  });


app.use('/tnsv-blog', require('./routes/blog.dev.routes.js'))

//integrate multer and path with this route
app.use('/user-credentials', require('./routes/credentials.dev.routes.js'))

// Serve static images
app.use("/assets", express.static(path.join(__dirname, "static")));

// Route to handle file uploads
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: `/assets/${req.file.filename}` });
});


const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {console.log(`Server is running on ${PORT}`);});
