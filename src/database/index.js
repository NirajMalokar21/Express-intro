const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/expressjs_tutorial')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));


    // Client ID: 1210047235253997588
    // Client secret: Z5Juo9VTpiLu7q9qrg54eLKMRwAe2y1c