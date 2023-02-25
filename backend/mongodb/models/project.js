import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    projectName: {type: String, required: true},
    projectDescription:{type:String, required:true},
    telegramChatId: {type: String, required: true},
    allTasks:[{type:mongoose.Schema.Types.ObjectId, ref:'Task', required: false, default: []}],
    projectMembers: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    projectMeetings:[{type:mongoose.Schema.Types.ObjectId, ref:'Meeting'}]
});

const projectModel = mongoose.model('Project', ProjectSchema);

export default projectModel;