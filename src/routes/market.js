const { Router } =  require('express')

const router= Router();

router.use((req, res, next) => {
    if (req.session.user) next();
    else res.send(401);
})

const superMarkets = [
    {
        id: 1,
        store: "Walmart",
        miles: 0.6,
    },
    {
        id: 2,
        store: "FreshCo",
        miles: 2.5,
    },
    {
        id: 3,
        store: "Independent Grocer",
        miles: 1.4,
    },
    {
        id: 4,
        store: "Food Basics",
        miles: 3.1,
    },
    {
        id: 5,
        store: "Farm Boy",
        miles: 2.3,
    },
    {
        id: 6,
        store: "Giant Tiger",
        miles: 4.2,
    },
]

router.get('/', (req, res) => {
    const { miles, sortBy } = req.query;
    const parsedMiles = parseInt(miles)
    if(miles && !isNaN(parsedMiles)) {
        const filteredStores = superMarkets.filter((m) => m.miles <= parsedMiles)

        if (sortBy === 'ASC') {
            filteredStores.sort((a, b) => a.miles - b.miles);
        } else if (sortBy === 'DESC') {
            filteredStores.sort((a, b) => b.miles - a.miles);
        }

        res.send(filteredStores)
    } else res.send(superMarkets);
})

router.get('/:storeName', (req, res) => {
    const { storeName } = req.params;
    const market = superMarkets.find((m) => m.store === storeName);
    res.send(market);
})

module.exports = router;

// QUERY PARAMETER NOTES ***********************************************************************************************************************
// Query parameters are a set of parameters that make a query string
// They are typically attached to the very end of a URL
// https://google.com/?q=java&filterBy=
// Brings you to the google homepage and has java already written in the textbox
// Query parameters are concatnated using & 
// Differences between route and query parameters
    // Route parameters are used to identify resources on a server
    // Query parameters are used to fiter, sort, or provide additional optional data to an endpoint
// *********************************************************************************************************************************************






