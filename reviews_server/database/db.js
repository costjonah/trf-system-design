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
// LOAD DATA LOCAL INFILE '/Users/shavkatshavkiev/Downloads/characteristic_reviews.csv'
// INTO TABLE characteristics_review
// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// IGNORE 1 LINES
// (id,characteristics_id,review_id,value);