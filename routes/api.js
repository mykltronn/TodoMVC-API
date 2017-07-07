const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')

const Todo = require('../todoSchema.js')
const router = express.Router();

router.use(bodyParser.json());

router.get('/todos', function(req,res) {
  Todo.find({}).then(function (todos){
    res.json(todos);
  })
})

router.post('/todos', function(req, res){
  const title = req.body.title;
        // completed = req.body.completed,
  const order = req.body.order;

  Todo.create({
    title: title,
    // completed: completed,
    order: order
  }).then(function (todo){
    console.log('NOTHING HAPPENED');
    res.status(201).json({
        
    });
  })
})


module.exports = router;
