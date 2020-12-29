let express = require('express');
let todoController = require('./controllers/controller');
let app = express();

// set up template engine
app.set('view engine','ejs');
// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

app.listen(3000);
console.log("You are listening to port " + 3000);








