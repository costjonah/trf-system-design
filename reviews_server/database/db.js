var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'reviews'
})

db.connect( err => {
  if (err) {
    console.log(err);
  }
})

module.exports = db


// //VERY USEFULL
// LOAD DATA LOCAL INFILE '/Users/shavkatshavkiev/Downloads/reviews.csv'
// INTO TABLE reviews
// FIELDS TERMINATED BY ','
// ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// IGNORE 1 LINES
// (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness);

// var mysql = require('mysql2');

// var db = mysql.createConnection({
//   host: '3.22.222.197',
//   user: 'shavkat',
//   database: 'reviews',
//   password: 'password',
//   port: '3306'
// })

// db.connect( err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connected to database')
//   }
// })

// module.exports = db


