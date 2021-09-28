CREATE SCHEMA productSchema;

-- DROP TABLE IF EXISTS list_products;

CREATE TABLE list_products (
  id serial PRIMARY KEY,
  name varchar(250),
  slogan text,
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
  sale_price int NOT NULL,
  original_price int NOT NULL,
  default_style bool,
  CONSTRAINT fk_product_style
    FOREIGN KEY (productId)
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
  sku_id int NOT NULL,
  count int NOT NULL
);