const { Router } =  require('express')


// ROUTER NOTES *********************************************************************************************************************************
// Allows you to create modular code by enabling you to separate endpoints
// Router is pretty similar to app
// You can register middleware, get reqs, post reqs
// app.use('/api', groceriesRouter)
// You can prefix the routes with any prefix you want
// We used it to add /groceries as a prefix and removes /groceries from our reqs
// **********************************************************************************************************************************************


const router = Router();

router.use((req, res, next) => {
    console.log('Inside groceries auth check middleware');
    if (req.user) next();
    else res.send(401);
})

const groceryList = [
    {
        item: 'milk',
        quantity: 2,
    },
    {
        item: 'cereal',
        quantity: 3,
    },
    {
        item: 'pop-tarts',
        quantity: 1,
    },
];



// HTTP COOKIES NOTES **************************************************************************************************************************
// Http cookies are blocks of data or piece of information sent from web server to the client (web browser, or POSTman in our case)
// Generally, http is stateless. i.e, there is no correlation between subsequent requests
// Cookies were introduced to allow http requests to have state
// When you make a request to a web server, that web server will send back a cookie, and that cookie can be stored on the client side
// Any subsequent request made to the server will typically send th cookie along the way. The web server will check the cookie and gives info
// For example, your cart is stored with the help of cookies.
// Cookies are stored in headers
// Cookie parser has to be included in middleware to read cookies
// *********************************************************************************************************************************************

router.get(
    '/',
    (req, res, next) => {
        // console.log("Before handling request.");
        next(); //Middleware pointing to the next function
    },
    (req, res) => {
        res.cookie('visited', true, {maxAge: 60000});
        res.send(groceryList);
    },
);



// SESSION NOTES *******************************************************************************************************************************
// The reason you might not always want to use cookies to store data is because all the data lives on the client side
// If you are storing sensitive information using cookies and if someone intercepted the cookie, they can decrypt the value and use it
// Sessions allow you to store all that information on the server side
// On subsequent requests, the client's browser sends the session ID cookie with the request, allowing the server to identify the client
// Express retrieves the session object associated with the client's session ID from the session store
// You can store and retrieve data in the session object, making it available throughout the user's session
// Sessions can be configured to expire after a certain period of inactivity or based on custom logic, ensuring security and resource management
// Access session data using req.session, which provides a key-value store for storing user-specific information
// *********************************************************************************************************************************************


router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if(!cart){
        res.send("Your cart is empty");
    }
    else {
        res.send(cart);
    }
    console.log(req.session)
});
router.post('/shopping/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    const { cart } = req.session;
    if(cart) {
        req.session.cart.items.push(cartItem);
    }else {
        req.session.cart = {
            items: [cartItem],
        };
    }
    res.send(201);
})




router.get('/:itemName', (req, res) => {
// router.get('/groceries/:itemName/:itemQuantity', (req, res) => {
    console.log(req.cookies);
    const { itemName } = req.params;
    const groceryItem = groceryList.find((g) => g.item === itemName)
    // const groceryItem = groceryList.find((g) => g.item === itemName && g.quantity == itemQuantity)
    res.send(groceryItem);
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.send(201);
});

module.exports = router;