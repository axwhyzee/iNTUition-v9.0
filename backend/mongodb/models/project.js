import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    telegramChatId: {type: String, required: true},
    allTasks:[{type:mongoose.Schema.Types.ObjectId, ref:'Task', required: false, default: []}],
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

const projectModel = mongoose.model('Project', ProjectSchema);

export default projectModel;