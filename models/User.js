var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema= mongoose.Schema({
	id: {type: String, required: true, unique: true },
	password: {type:String, required: true },
	name: {type:String, required: true },
	point : {type: Number, required: true },
	contact : {type: String },
	email : {type: String,required:true},
	image: {type:String, required:true, default: "default.jpg"}
});
/*
userSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}	else {
		user.password = bcrypt.hashSync(user.password);
		return next();
	}
});

userSchema.methods.authenticate = function (password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

userSchema.methods.hash = function (password) {
  return bcrypt.hashSync(password);
};
*/

var User = mongoose.model('user', userSchema);
module.exports = User;
