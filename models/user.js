var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique:true,
		index: true,
		required: 'Username cannot be left blank'
	},
	password: {

		type: String,
		index: true,
		required: 'Password cannot be left blank'
	},
	email: {
		type: String,
		index: true, 
		unique: true,
		required: 'Email address cannot be left blank'
	},
	name: {
		type: String,
		required: 'Name cannot be left blank',
		index: true
	},
	tower: {
		type: String,
		required: 'Tower cannot be left blank',
		index: true

	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}