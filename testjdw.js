
// get mongoose package
var mongoose = require('mongoose');

// connect to MongoDB / the name of DB is set to 'myDB'
//mongoose.connect('mongodb://'+config.account.mongoid+':'+config.account.mongopw+'@ds129030.mlab.com:29030/freedombear');
mongoose.connect('mongodb://freedombear:freedombear@ds129030.mlab.com:29030/freedombear');
// we get the pending connection to myDB running on localhost
var db = mongoose.connection;
// executed when the connection opens
db.once('open', function () {
	// add your code here when opening
  	console.log("db connection ok");
});
// we get notified if error occurs
db.on('error', function(err){
	console.log("db error : ",err);
});

var Schema = mongoose.Schema;
/*
var userSchema= new Schema({
	id: {type: String, required: true, unique: true },
	password: {type:String, required: true },
	name: {type:String, required: true },
	point : {type: Number, required: true },
	contact : {type: String },
	email : {type: String,required:true},
	image: {type:String, required:true, default: "default.jpg"},
});
*/

//var User = mongoose.model('User', userSchema); 
/*
var user1 = new User({ id: 'yyeji0922', 
			password: 'yyeji0922',
			name:'에지',
			point:0,
			email:'yyeji0922@naver.com',
			image:'default.jpg' });
var user2 = new User({ id: 'ilikefruit', 
			password: 'ilikefruit',
			name:'다우니',
			point:0,
			email:'ilikefruit@naver.com',
			image:'default.jpg' });
// save user1
user1.save(function(err,user1){
	if(err)
		console.log("error");
});
//save user2
user2.save(function(err,user1){
	if(err)
		console.log("error");
});
var med1 = new Med({
	med_id:1,
	title:'인물 사진 데이터 정형화 해주실분 구합니다.',
	content:'안녕하세요 저희가 얼굴인식기능을 구현하기 위해 데이터를 정형화 해주실 분을 구합니다. 관심 있으신 분은 저희에게 연락해주세요.',
	writer_id:'ilikefruit',
	email:'freedombear@naver.com',
	due_date:Date.now + 1000*60*24*3,
	pay:1,
	summary:'인물 사진 데이터 정형화 알바 구합니다.'
});
*/
/*med1.save(function(err,med1){
	if(err)
		console.log("error");
});*/

var Schema = mongoose.Schema;

var medSchema= new Schema({
	med_id:{type:Number,required:true, unique:true},
	title : {type: String, required:true },
	content : {type: String, required:true },
	writer_id : {type: String, required:true },
	email : {type: String, required:true},
	due_date : {type: Date},
	pay: {type: Number, required: true, default: -1},
	finished: {type: Boolean, required: true, default: false},
	upload_time : { type: Date, required: true, default: Date.now },
	summary : {type: String, required:true, default: "상세정보를 위해서 클릭하세요" },
});


var Med = mongoose.model('Med',medSchema);
var mydate =  new Date(2017,08,20,18,00);
var med1 = new Med({
	med_id:1,
	title:'인물 사진 데이터 정형화 해주실분 구합니다.',
	content:'안녕하세요 저희가 얼굴인식기능을 구현하기 위해 데이터를 정형화 해주실 분을 구합니다. 관심 있으신 분은 저희에게 연락해주세요.',
	writer_id:'ilikefruit',
	email:'freedombear@naver.com',
	due_date: mydate,
	pay:1,
	summary:'인물 사진 데이터 정형화 알바 구합니다.'
});


med1.save(function(err,med2){
	if(err)
		console.log("error:can't insert");
	else
		console.log("insertion success");
});