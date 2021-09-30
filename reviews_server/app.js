const express = require('express');
const morgan = require('morgan');
const controller = require('./controller/index.js');
const port = 3000

const app = express()

app.use(express.json())
app.use(morgan('dev'))


app.get('/api/reviews/:page?/:count?/:sort?/:product_id?', controller.getReviews)

app.listen(port, ()=> {
  console.log(`Express running on ${port}`)
})