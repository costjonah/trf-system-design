DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE products(
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slogan text NOT NULL,
  description text NOT NULL,
  category VARCHAR(50),
  default_price int,
  PRIMARY KEY(id)
);

CREATE TABLE reviews(
  id INT NOT NULL AUTO_INCREMENT,
  product_id int,
  rating int,
  date DATETIME NOT NULL,
  summary text,
  body text NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(50) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response TEXT,
  helpfulness INT,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE review_photos(
  id INT NOT NULL AUTO_INCREMENT,
  review_id int,
  url text,
  PRIMARY KEY(id),
  FOREIGN KEY(review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics(
  id INT NOT NULL AUTO_INCREMENT,
  product_id int,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE characteristics_review(
  id INT NOT NULL AUTO_INCREMENT,
  characteristics_id INT,
  review_id INT,
  value INT,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristics_id) REFERENCES characteristics(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);