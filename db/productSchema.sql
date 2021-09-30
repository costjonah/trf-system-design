CREATE TABLE list_products (
  id serial PRIMARY KEY,
  name varchar(250),
  slogan text,
  description text,
  category varchar(250),
  default_price int NOT NULL
);

CREATE TABLE product_information (
  id serial PRIMARY KEY,
  product_id int NOT NULL,
  feature varchar(250),
  value varchar(250),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES list_products(id)
);

CREATE TABLE related_products (
  id serial PRIMARY KEY,
  current_product_id int NOT NULL,
  related_product_id int NOT NULL,
  CONSTRAINT fk_current_product
    FOREIGN KEY(current_product_id)
      REFERENCES list_products(id)
);

CREATE TABLE product_styles (
  id serial PRIMARY KEY,
  productId int NOT NULL,
  name varchar(250),
  sale_price int,
  original_price int NOT NULL,
  default_style bool,
  CONSTRAINT fk_product_style
    FOREIGN KEY(productId)
      REFERENCES list_products(id)
);

CREATE TABLE skus (
  id serial PRIMARY KEY,
  styleId int NOT NULL,
  size varchar(250),
  quantity int NOT NULL,
  CONSTRAINT fk_style
    FOREIGN KEY(styleId)
      REFERENCES product_styles(id)
);

CREATE TABLE photos (
  id serial PRIMARY KEY,
  styleId int NOT NULL,
  url text,
  thumbnail_url text,
   CONSTRAINT fk_photo
    FOREIGN KEY(styleId)
      REFERENCES product_styles(id)
);

CREATE TABLE cart (
  id serial PRIMARY KEY,
  user_session int NOT NULL,
  product_id int NOT NULL,
  active int,
  CONSTRAINT fk_cart
    FOREIGN KEY(product_id)
      REFERENCES list_products(id)
);

DROP TABLE IF EXISTS current_items;

CREATE TABLE current_items (
  id int PRIMARY KEY,
  sku_id int,
  count int,
  user_session int NOT NULL
);

COPY list_products(id, name, slogan, description, category, default_price)
FROM '/Users/JonahC/Downloads/product.csv'
DELIMITER ','
CSV HEADER;

COPY product_information(id, product_id, feature, value)
FROM '/Users/JonahC/Downloads/features.csv'
DELIMITER ','
CSV HEADER;

COPY related_products(id, current_product_id, related_product_id)
FROM '/Users/JonahC/Downloads/related.csv'
DELIMITER ','
CSV HEADER;

COPY product_styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Users/JonahC/Downloads/styles.csv'
null as 'null'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/Users/JonahC/Downloads/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/JonahC/Downloads/photos.csv'
DELIMITER ','
CSV HEADER;

COPY cart(id, user_session, product_id, active)
FROM '/Users/JonahC/Downloads/cart.csv'
DELIMITER ','
CSV HEADER;