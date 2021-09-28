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

  console.log('Connected to cowsList Database');

})

module.exports = db



LOAD DATA LOCAL INFILE '/Users/shavkatshavkiev/Downloads/characteristic_reviews.csv'
INTO TABLE characteristics_review
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id,characteristics_id,review_id,value);