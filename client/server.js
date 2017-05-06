const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');



const apiProxy = proxy('localhost:3100/api', {
    forwardPath: function (req, res) {
        return require('url').parse(req.baseUrl).path;
    }
});





const app = express();



app.use(express.static(__dirname + '/dist'));


/*app.get('/!*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});*/


app.use("/api/*", apiProxy);


// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8888, () => console.log(`Server running on port 8888`)) ;
