# Express-Ecommerce-Ejs

## This app was created as the final proyect required in CoderHouse's FullStack career

Data persistence is achieved through the utilization of MongoDB tools

This app can:
  + Manage users data, create a user, log in with an existing one and use Github to login/create a user based on your Github's public account info.
  + Manage session data, saves the user in an expiring session for security and verifies if it's active before making any other requests.
  + Manage products and products in carts, adds and removes products from carts designated to the user, displays the products available in the database and the ones already in a user's cart. 
  + Generate a purchase order when the user's data is correct, asks for completion if a needed value is missing and uses both user and cart data from the database to send and email with the details.
 
 List of dependencies:
 
    -"bcrypt": "^5.0.1", 
    -"chai": "^4.3.7",
    -"connect-mongo": "^4.6.0",
    -"ejs": "^3.1.8", 
    -"express": "^4.18.2",
    -"express-session": "^1.17.3",
    -"faker": "^6.6.6",
    -"mocha": "^10.1.0",
    -"mongoose": "^6.6.1",
    -"nodemailer": "^6.8.0",
    -"passport": "^0.6.0",
    -"passport-github": "^1.1.0",
    -"passport-local": "^1.0.0",
    -"supertest": "^6.3.1",
    -"swagger-jsdoc": "^6.2.7",
    -"swagger-ui-express": "^4.6.0",
    -"sweetalert2": "^11.6.15",
    -"yargs": "^17.6.2"
