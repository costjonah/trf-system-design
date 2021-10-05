CREATE INDEX list_products_idx
  ON list_products(id);

CREATE INDEX product_info_idx
  ON product_information(product_id);

CREATE INDEX product_styles_idx
  ON product_styles(id, productId);

CREATE INDEX skus_idx
  ON skus(styleId);

CREATE INDEX photos_idx
  ON photos(styleId);

CREATE INDEX related_products_idx
  ON related_products(current_product_id);
