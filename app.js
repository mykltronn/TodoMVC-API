const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Todo = require('./todoSchema.js');
// const apiRouter = require('./routes/api');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/todomvcv');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));




app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})


app.get('/api/todos', function(req, res) {

  Todo.find().then(function(){
    res.json(todos.map(function(todo) {
      return todo.toJSON();
    }))
  }).catch(function(){
    console.log('you blew it, fool');
  })
})

app.post('/api/todos', function(req, res) {
  console.log("User POSTs");
  Todo.create(
      {title: req.body.title}
    ).then(function(todo){
      console.log("todo added: " + todo);
    }).catch(function(err){
        console.log(err);
      })
})

app.get('/api/todos/:id', function (req, res){
  console.log("User GETs, id of: " + req.params.id);
  Todos.findOne(
    {_id: req.params.id}
  ).then(function(todo){
    res.json(todo.toJSON());
  })
})

app.put('/api/todos/:id', function (req, res) {
  Todos.findById(req.params.id).then(function (todo){
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.order = req.body.order;
    todo.save().then(function() {
      res.json(todo.toJSON());
    })
  })
})

app.patch('/api/todos/:id', function (req, res) {
  console.log("sent via PATCH: " + req.body);
  Todos.findById(req.params.id).then(function (todo) {
    if (req.body.title) {
      todo.title = req.body.title;
    } else if (req.body.completed) {
      todo.completed = req.body.completed;
    } else if (req.body.order) {
      todo.order = req.body.order;
    }
    todo.save().then(function () {
      res.json(todo.toJSON());
    })
  })
})

app.delete('/api/todos/:id', function (req, res) {
  console.log("DELETing id: " + req.params.id);
  Todos.deleteOne({_id: req.params.id}).then(function () {
    console.log("successfully deleted something.");
  })
})



app.listen(3000, function () {
    console.log('VVV VVV VV VVV VVV');
    console.log('VVV VVV VV VVV VVV');
    console.log('Got you goin, son.')
});
