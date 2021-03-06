# _X-Shopping-List-Heroku_
##### This project was a copy of  [x-shopping-list](https://github.com/planimir77/x-shopping-list) with an API server, configured to deploy in [Heroku](https://www.heroku.com/home).
##### For a demo and further details see <https://x-shopping-list.herokuapp.com>.
# Configuring Angular App to Deploy Properly on Heroku
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
Your node, npm and typescript versions may be different
### 3. Install [Express](https://expressjs.com/) and other dependencies to run your server.
 ```sh
npm install express express-session dotenv cookie-parser jsonwebtoken mongoose bcrypt cors --save
 ```
### 4. Create a server.js and server-root folder in the application root
### 5. Create typings.d.ts file in src directory 
```javascript
/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
```
### 6. Add to tsconfig.json
```sh
"compilerOptions": {
    "typeRoots": [
      "node_modules/@types"
    ],
}
```
### For local preview open PowerShell from the root directory and type :
```sh
heroku local web
```
### If you have not yet installed Heroku CLI visit <https://devcenter.heroku.com/articles/heroku-cli#download-and-install>
### Now you’re ready to create your first Heroku app
### Step-by-step guides for deploying [Getting Started on Heroku](https://devcenter.heroku.com/start)
### Don't forget to add environment variables in the app settings tab