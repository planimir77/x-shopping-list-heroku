# `x-shopping-list-heroku`
_This project was a copy of [x-shopping-list](https://github.com/planimir77/x-shopping-list) version 1.0.0. with an API server, configured to deploy in [Heroku](https://www.heroku.com/home)_
## Configuring Angular App to Deploy Properly on Heroku
### 1. Latest version of angular cli and angular compiler cli.
### 2. Configuring package.json
2.1. Change start command.
 ```sh
 "start": "node server.js",
 ```
 2.2. Create postinstall script and add prod flag to "ng build".
 ```sh
 "build": "ng build --prod",
 "postinstall": "ng build --prod --output-path dist/x-shopping-list"
 ```
 2.3. Add Node and NPM engines.
  ```sh
 "engines": {
    "node": "12.16.3",
    "npm": "6.14.4"
  },
 ```
2.4. Copy typescript to dependencies.
 ```sh
"dependencies": {
    "typescript": "~4.0.2"
 },
 ```
### 3. Install [Express](https://expressjs.com/) and other dependencies to run your server.
 ```sh
npm install express express-session dotenv cookie-parser jsonwebtoken mongoose bcrypt cors --save
 ```
### 4. Create a server.js and server-root folder in the application root
