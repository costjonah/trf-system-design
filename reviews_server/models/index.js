const db = require('../database/db.js')

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  getReviews: function(page,count,sort,product_id,callBack){
    let query = `SELECT id AS review_id, rating,summary,recommend,response,body,date,reviewer_name,helpfulness FROM reviews WHERE product_id = ? and reported = 0 ORDER BY ${sort} DESC LIMIT ${count}`
    let queryArgs = [product_id, count]
    db.query(query,queryArgs, (err, data)=>{
      if(err){
        callBack(err)
      } else {
        Promise.all(
          data.map(review => {
            let newDate = new Date(review.date)
            newDate.toISOString()
            review.date = newDate

            return new Promise((resolve, reject) => {
              let queryString = `SELECT id, url FROM review_photos WHERE review_id = ${review.review_id}`
              db.query(queryString, (err, photos) => {
                if(err){
                  reject(err)
                } else {
                  review.photos = photos
                  resolve(review)
                }
              })
            })
          })
        )
        .then(updatedData => {
          callBack(null, data)
        })
      }
    })
  },

  getMeta: function(productID, callBack){

  },

  addReview: function(body, callBack){
    if(body.product_id === undefined || body.rating === undefined || body.body === undefined || body.recommend === undefined || body.name === undefined || body.email === undefined){
      callBack('Missing Question Parameter')
    }
    if(!validateEmail(body.email)){
      callBack('Invalid email')
    }
    let currentTime = Date.parse(new Date())

    let queryString = 'INSERT INTO reviews (product_id, rating, date, summary, body,recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let queryArgs = [body.product_id, body.rating, currentTime, body.summary, body.body,body.recommend, false, body.name, body.email, null, 0]

    db.query(queryString, queryArgs, (err, response) => {
      if(err){
        callBack(err)
      }
      db.query('SELECT LAST_INSERT_ID()', (err, id) => {
        if(err){
          callBack(err)
        }
        Promise.all(
          body.photos.map(photo => {
            return new Promise((resolve, reject) => {
              let queryStringPhotos = `INSERT INTO review_photos (review_id, url) VALUES (${id[0]['LAST_INSERT_ID()']}, '${photo}')`
              db.query(queryStringPhotos, (err, success) => {
                if(err){
                  reject(err)
                }
                resolve(success)
              })
            })
          })
        )
        .then(response => {
          Promise.all(
            Object.keys(body.characteristics).map(key => {
              let value = body.characteristics[key]
              return new Promise((resolve, reject) => {
                let queryStringChar = `INSERT INTO characteristics_review (characteristics_id, review_id, value) VALUES (${+key}, ${id[0]['LAST_INSERT_ID()']}, ${value})`
                db.query(queryStringChar, (err, resp) => {
                  if(err){
                    reject(err)
                  }
                  resolve(resp)
                })
              })
            })
          )
          .then(response => callBack(null, response))
          .catch(err => {
            console.log(err)
            callBack(err)
          })
        })
        .catch(err => {
          console.log(err)
          callBack(err)
        })
      })

    })


  },

  markHelpful: function(reviewID, callBack){
    let queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${reviewID}`
    db.query(queryString, (err, response) => {
      if(err){
        callBack(err)
      }
      callBack(null, response)
    })
  },

  reportReview: function(reviewID, callBack){
    let queryString = `UPDATE reviews SET reported = 1 WHERE id = ${reviewID}`
    db.query(queryString, (err, good) => {
      if(err){
        callBack(err)
      }
      callBack(null, good)
    })
  }

}