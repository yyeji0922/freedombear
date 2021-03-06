var mongoose = require('mongoose');

var MedSchema= mongoose.Schema({
	title : {type: String, required:true },
	content : {type: String, required:true },
	writer_id : {type: String, required:true },
	email : {type: String, required:true},
	due_date : {type: Date},
	pay: {type: Number, required: true, default: -1},
	finished: {type: Boolean, required: true, default: false},
	upload_time : { type: Date, required: true, default: Date.now },
	summary : {type: String, required:true, default: "상세정보를 위해서 클릭하세요" },
	image: {type:String, required:true, default: "default.jpg"}
});

var Med = mongoose.model('med', MedSchema);
module.exports = Med;
