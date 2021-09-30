const models = require('../models/index.js')

module.exports = {
  getReviews: function(req, res){
    let page = req.query.page || 1
    let count = req.query.count || 5
    let sort = !req.query.sort ? 'rating' : req.query.sort
    let product_id = req.query.product_id
    if(req.query.product_id){
      models.getReviews(page,count,sort,product_id,function(err, data){
        if(err){
          res.status(500)
          res.end('Something went wrong')
        }
        res.json(data)
      })
    } else {
      res.status(422)
      res.end('Missing Product ID')
    }
  }

}