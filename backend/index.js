const connectWithMongo = require('./db')
const express = require('express')
var cors = require('cors')

// create connection with DB, using mongoose. 
connectWithMongo(); 

const app = express();
const port = 5000

app.use(express.json());
app.use(cors())


// route for authintication. 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note', require('./routes/notes'))
app.post('/', (req, res)=>{
  res.send("I am prime")
})

// for server response purpose. 
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})