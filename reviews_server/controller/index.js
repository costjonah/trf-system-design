const models = require('../models/index.js')

module.exports = {
  getReviews: function(req, res){
    let page = req.query.page || 1
    let count = req.query.count || 5
    let sort = req.query.sort
    let isValidSort = true
    if(sort === 'newest'){
      sort = 'date'
    } else if(sort === 'helpful'){
      sort = 'helpfulness'
    } else if(sort === 'relevant'){
      sort = 'rating'
    } else if(sort === undefined){
      sort = 'rating'
    } else {
      isValidSort = false
      res.status(422)
      res.send('Invalid sort parameter')

    }

    let product_id = req.query.product_id
    if(!isValidSort){
      res.status(422)
      res.send('Invalid Sort Parameter')
    } else if(req.query.product_id && isValidSort){
      models.getReviews(page,count,sort,product_id,function(err, data){
        if(err){
          console.log(err)
          res.status(500)
          res.send('Something went wrong')
        } else {
          let result = {}
          result.product = product_id
          result.count = count
          result.sort = sort
          result.results = data
          res.json(result)
        }
      })
    } else if(!product_id) {
      res.status(422)
      res.send('Missing Product ID')
    }
  },

  getMeta: function(req,res){
    let productID = req.query.product_id
    if(!productID){
      res.status(422)
      res.send('Invalid product_id')
    } else {
      models.getMeta(productID, (err, data) => {
        if(err){
          res.send(err)
        }
        res.status(200)
        res.send(data)
      })
    }
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
    if(!reviewID){
      res.status(422)
      res.end('Invalid review_id')
    } else {
      models.markHelpful(reviewID, (err, good) => {
        if(err){
          res.status(400)
          res.end('Something went wrong')
        }
        res.status(204)
        res.end()
      })
    }
  },

  reportReview: function(req, res){
    let reviewID = req.params.review_id
    if(!reviewID){
      res.status(422)
      res.end('Invalid review_id')
    }
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