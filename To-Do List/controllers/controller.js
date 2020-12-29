//let data = [];
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// connect to the database
mongoose.connect('..');

//Create a schema
let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);
// let item1 = Todo({item: 'Buying Vegetables'}).save(function (err){
//     if(err) throw err;
//     console.log('item saved');
// });

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo',function(req, res){
        // get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
    });

    app.post('/todo',urlencodedParser,function(req, res){
        // get data from view and add it to mongodb
        let newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item',function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
};








