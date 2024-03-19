const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const passport = require('passport');
// require('./strategies/local');
require('./strategies/discord');

// Routes
const groceriesRoute = require('./routes/groceries');
const marketsRoute = require('./routes/market');
const authRoute = require('./routes/auth');

require('./database')

const app = express();

const PORT = 3001;

// const memoryStore = new session.MemoryStore();

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(session({
    secret: "JSDFASDKGBUIYEBRKDJGBNIURBOBNAPIEQB",
    resave: false,
    saveUninitialized: false,
    // store: mongoStore,
    store: mongoStore.create({
        mongoUrl: "mongodb://localhost:27017/expressjs_tutorial",
    })
}))

app.use((req, res, next) => {//This is a simple logging middleware
    console.log(`${req.method}: ${req.url}`);
    next();
});

// ALL NEEDED TO ENABLE PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/groceries', groceriesRoute);
app.use('/api/v1/market', marketsRoute);
app.use('/api/v1/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Running express server on port: ${PORT}!`)
});




// APP.USE NOTES******************************************************************************************************************************
// Most common task middleware performs is logging
// We can now send json and urlencoded 
// All of these are applied before we hit the routes/endpoints
// You have to make sure middleware is registered before routes are registered to make sure it works
// ********************************************************************************************************************************************


// GET REQUEST NOTES***************************************************************************************************************************
// First parameter is mandatory, it is the path
// You'd want to define path in such a way that it would make sense to end user making request
// Pretend we are making an application that returns a list of groceries

// The request parameter gives all information about the client making request such as cookies, IP address, headers, auth
// The response parameter is responsible for handling sending response back to the client
// The next parameter allows you to invoke the next middleware
// ********************************************************************************************************************************************

// app.get(
//     '/groceries',
//     (req, res, next) => {
//         // console.log("Before handling request.");
//         next(); //Middleware pointing to the next function
//     },
//     (req, res, next) => {
//         res.send(groceryList);
//         next();
//     },
// );
// ********************************************************************************************************************************************



// ROUTE PARAMETER NOTES************************************************************************************************************************
// Route paramters capture values that are specified at a certain position in the URL
// GET http://localhost:3001/groceries/
// All the parameters are stored in params as a key value pair
// ********************************************************************************************************************************************


// app.get('/groceries/:itemName/:itemQuantity', (req, res) => {
//     const { itemName, itemQuantity } = req.params;
//     const groceryItem = groceryList.find((g) => g.item === itemName && g.quantity == itemQuantity)
//     res.send(groceryItem);
// });
// ********************************************************************************************************************************************




// MIDDLEWARE NOTES ***************************************************************************************************************************
// Middleware is a function that is to be invoked in the middle of the two main functionalities
// The function is to be called during the life cycle of our request
// Eg: If we're trying to retrieve grocery list and we haven't sent the response back, middleware can perform a task in between
// Technically, callback functions are middleware

// The next parameter in get, post allows you to invoke the next middleware
// Each middleware parameter has access to 2 objects and 1 function: request, response, next
// You can chain middleware to execute operations
// You dont need to use next function in your request handler
// ********************************************************************************************************************************************



//POST REQUEST NOTES **************************************************************************************************************************

// Get is for getting stuff from the grocery list
// Post is used to create data in the grocery list
// In short, post is used to create new resource, eg:  for a new user account, a username, password etc is sent by post
// On the client side, you send the data in a 'payload' or a 'request body'

// Takes in path as the first parameter and a request handler as the second parameter
// Form url ecoded is the standard way forms serialise data, you will often need to make sure that your server can interpret url encoded data
// ********************************************************************************************************************************************

// app.post('/groceries', (req, res, next) => {
//     console.log(req.body);
//     groceryList.push(req.body);
//     res.send(201);
// });
// ********************************************************************************************************************************************



