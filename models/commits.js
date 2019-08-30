var mongoose =require('mongoose');
const commitSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
  commit_id:String,
  message:String,
  timestamp:String,
  url:String, 
  author_name:String
});
const Commit = mongoose.model('commits', commitSchema);
module.exports= Commit;