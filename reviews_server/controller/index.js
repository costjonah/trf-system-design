const models = require('../models/index.js')

module.exports = {
  getReviews: function(req, res){
    let page = req.query.page || 1
    let count = req.query.count || 5
    let sort = req.query.sort
    if(sort === 'newest'){
      sort = 'date'
    } else if(sort === 'helpful'){
      sort = 'helpfulness'
    } else if(sort === 'relevant'){
      sort = 'rating'
    } else if(sort === undefined){
      sort = 'rating'
    } else {
      res.status(400)
      res.send('Invalid sort parameters')
    }

    let product_id = req.query.product_id
    if(req.query.product_id){
      models.getReviews(page,count,sort,product_id,function(err, data){
        if(err){
          res.status(500)
          res.send('Something went wrong')
        }
        res.json(data)
      })
    } else {
      res.status(422)
      res.send('Missing Product ID')
    }
  },

  getMeta: function(req,res){
    let product_id = req.query.product_id
    res.send(`Get Meta: ${product_id}`)
  },

  addReview: function(req,res){
    models.addReview(req.body, (err, response) => {
      if(err){
        res.status(400)
        res.send(err)
      } else {
        res.status(201)
        res.send('CREATED')
      }
    })
  },

  markHelpful: function(req, res){
    let reviewID = req.params.review_id
    models.markHelpful(reviewID, (err, good) => {
      if(err){
        res.status(400)
        res.end('Something went wrong')
      }
      res.status(204)
      res.end()
    })
  },

  reportReview: function(req, res){
    let reviewID = req.params.review_id
    models.reportReview(reviewID, (err, good) => {
      if(err){
        res.status(400)
        res.end('Somthing went wrong')
      }
      res.status(204)
      res.end()
    })
  }
}