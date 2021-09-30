var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'reviews'
})

db.connect( (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Connected to reviews Database');

})

module.exports = db


//VERY USEFULL
// LOAD DATA LOCAL INFILE '/Users/shavkatshavkiev/Downloads/reviews.csv'
// INTO TABLE reviews
// FIELDS TERMINATED BY ','
// LINES TERMINATED BY '\n'
// IGNORE 1 LINES
// (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness);