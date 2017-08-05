var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema= mongoose.Schema({
	uid: {type: String, required: true, unique: true },
	password: {type:String, required: true },
	name: {type:String, required: true },
	point : {type: Number, required: true, default:0 },
	contact : {type: String},
	major : {type: Number, required: true, default: -1},//10100 이면 1번no 2번no 3번yes 4번no 5번yes 
	lang : {type: Number, required: true, default: -1},
	email : {type: String,required:true},
	image: {type:String, required:true, default: "default.svg"}
});

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


var User = mongoose.model('user', userSchema);
module.exports = User;
