## Description
 An API microservice that supports the product and cart components of a large front-end e-commerce website.
## Goal
 Build the server and database for single service which supports the a large front-end e-commerce website, and optimize it to handle large quantities of data and traffic.
## Results
This system was developed and deployed using Docker containers in conjunction with AWS EC2 instances, and load-balanced with NginX. When stress testing the system using Loader.io the endpoints initially returned the following results when handling 1,000 client requests per second of a single product ID over a 1 minute duration:

> /products: AVG RESP = 4ms / ERR RATE = 0.0% <br />
> /product_information: AVG RESP = 4ms / ERR RATE = 0.0% <br />
> /related_products: AVG RESP = 4ms / ERR RATE = 0.0% <br />
> /products_styles: AVG RESP = 5ms / ERR RATE = 0.0% <br />

After the implementation of caching, the product styles endpoint returned the following results when handling 10,000 client requests per second of 5,000 dynamically generated product IDs over a 1 minute duration:

> /products_styles: AVG RESP = 1ms / ERR RATE = 0.0% / SUCCESS = 599960/600000


## Setting Up Repository on Local Machine
- [ ] `npm install`
- [ ] install postgres on your OS
- [ ] create a super user role with login permission and a password
- [ ] create a database with the same name as the role
- [ ] `vim ./server/database/index.js` and change user and password to the role and password you just created
- [ ] `psql -f ./server/database/schema.sql`

## Further Usage
- [ ] create a .env file populated with your DATABASE_USER, DATABASE_PASS, and DATABASE_NAME
- [ ] obtain the verification route from Loader.io and replace the data in the corresponding GET route with your own in the server/routes.js file
