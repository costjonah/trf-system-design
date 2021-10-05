const express = require('express');
const morgan = require('morgan');
const controller = require('./controller/index.js');

const app = express()

app.use(express.json())
app.use(morgan('dev'))

//Get meta data for a product
app.get('/api/reviews/meta/:product_id?', controller.getMeta)
//Get reviews for a product
app.get('/api/reviews/:page?/:count?/:sort?/:product_id?', controller.getReviews)
//Add a new review
app.post('/api/reviews', controller.addReview)
//Mark a review as help full
app.put('/api/reviews/:review_id/helpful', controller.markHelpful)
//Report a review
app.put('/api/reviews/:review_id/report', controller.reportReview)

module.exports = app