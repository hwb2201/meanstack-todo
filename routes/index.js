var express = require('express');
var router = express.Router();
var Todo = require('../app/models/todo');

// get all todos
// create todo and send back all todos after creation
router.route('/todos')
.post(function (req, res) {
		var todo = new Todo();
		todo.text = req.body.text;
		todo.done = false;
	
		todo.save(function(err) {
			if(err) res.send(err);
			Todo.find(function(err, todos) {
				if(err)
					res.send(err);
				res.json(todos);
			});
		});
}).get(function(req, res) {
		Todo.find(function(err, todos) {
			if(err)
				res.send(err);
			res.json(todos);
		});
});

// delete a todo
router.route('/todos/:todo_id')
.delete(function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todos) {
			if ( err)	res.send(err);
			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if(err)
					res.send(err);
				res.json(todos);
			});
		});
});

module.exports = router;
