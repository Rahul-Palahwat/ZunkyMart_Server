const connectToMongo = require('./db');
connectToMongo();

let cors = require('cors')
const express = require('express')
const app = express()
const PORT = 8000;

app.use(cors())
app.use(express.json())

// Available Routes
app.get('/', (req, res) => {
  res.status(200).send({ message: "App started successfully!" })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth', require('./routes/cart'))
app.use('/api/auth', require('./routes/item'))
app.use('/api/auth', require('./routes/order'))

app.listen(process.env.PORT || PORT, () => {
  console.log(`Bigmart running at http://localhost:${PORT}`)
})