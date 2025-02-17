
const express =
require('express')
require('dotenv').config();
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const cors = require('cors')
app.use(cors());

mongoose = require('mongoose');
mongoose.set('debug',true)
mongoose.set('strictQuery',false);

async function connecting(){
  try {
    await mongoose.connect(process.env.MONGO), console.log('Connected to the MongoDb Atlas')
   
  }
  catch ( error ){
    console.log('ERROR: .envs are missing or failed to use mongoose connect ');
    console.log(error)
  }
}connecting()

app.get('/', (req, res) => {
  res.send({ok:true, message:"DO-server2 is running"})
  });


app.use('/tnsv-blog', require('./routes/blog.dev.routes.js'))

app.use('/user-credentials', require('./routes/credentials.dev.routes.js'))


const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {console.log(`Server is running on ${PORT}`);});
