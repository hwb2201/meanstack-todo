var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define model ===============
var Todo = mongoose.model('Todo', {
	text : String,
	done : Boolean
});

module.exports = mongoose.model('Todo', Todo);