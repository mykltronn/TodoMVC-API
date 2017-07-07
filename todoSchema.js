const mongoose = require('mongoose');



const todoSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    order: Number,
    completed: { type: Boolean, required: true, default: false }
});

todoSchemea.methods.toJSON = function () {
  return { // JSONifies user input by cramming it in to an object of key-value pairs
    id: this._id,
    completed: this.completed,
    order: this.order,
    title: this.title
  }
}



const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;
