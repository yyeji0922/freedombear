// get mongoose package
var mongoose = require('mongoose');

// connect to MongoDB / the name of DB is set to 'myDB'
mongoose.connect('mongodb://'+config.account.mongoid+':'+config.account.mongopw+'@ds129030.mlab.com:29030/freedombear');

// we get the pending connection to myDB running on localhost
var db = mongoose.connection;
// we get notified if error occurs
db.on('error', console.error.bind(console, 'connection error:'));
// executed when the connection opens
db.once('open', function callback () {
	// add your code here when opening
  	console.log("open");
});

var Schema = mongoose.Schema;

var userSchema= new Schema({
	id: {type: String, required: true, unique: true },
	password: {type:String, required: true },
	name: {type:String, required: true },
	point : {type: Number, required: true },
	job : {type: Boolean, required: true },
	contact : {type: String },
	email : {type: String},
	image: {type:String, required:true, default: "default.jpg"},
});


var medSchema= new Schema({
	title : {type: String, required:true },
	content : {type: String, required:true },
	writer_id : {type: String, required:true },
	contact: {type: String},
	email : {type: String},
	due_date : {type: Date},
	pay: {type: Number, required: true, default: -1},
	finished: {type: Boolean, required: true, default: false},
	upload_time : { type: Date, required: true, default: Date.now },
	summary : {type: String, required:true, default: "상세정보를 위해서 클릭하세요" },
});


var User = mongoose.model('User', userSchema);
var Med = mongoose.model('Med',medSchema);

var user1 = new User({ id: 'yyeji0922', 
			password: 'dbcndfuf',
			name:'정예지',
			point:0,
			job:'normal',
			contact:'01028432813',
			email:'yyeji0922@naver.com',
			image:'default.jpg' });
var user2 = new User({ id: 'freedombear', 
			password: 'freedombear',
			name:'자유곰',
			point:0,
			job:'company',
			contact:'01012341234',
			email:'freedombear@naver.com',
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
	title:'인물 사진 데이터 정형화 해주실분 구합니다.',
	content:'안녕하세요 저희는 freedombear 입니다. 저희가 얼굴인식기능을 구현하기 위해 데이터를 정형화 해주실 분을 구합니다. 관심 있으신 분은 저희에게 연락해주세요.',
	writer_id:'freedombear',
	email:'freedombear@naver.com',
	due_date:Date.now + 1000*60*24*3,
	pay:1
	finished: default,
	upload_time:default,
	summary:'인물 사진 데이터 정형화 알바 구합니다.'
});

var med2 = new Med({
	title:'꽃 사진 데이터 정형화',
	content:'안녕하세요 꽃 종류를 인식하는 어플을 만들기위해 데이터 라벨링이 필요합니다. 이메일로 연락주세요.',
	writer_id:'yyeji0922',
	email:'yyeji0922@naver.com',
	due_date:Date.now + 1000*60*24*4,
	pay:1.5
	finished: default,
	upload_time:default,
	summary:default
});

med1.save(function(err,user1){
	if(err)
		console.log("error");
});
med2.save(function(err,user1){
	if(err)
		console.log("error");
});
