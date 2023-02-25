import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    project:{type:mongoose.Schema.Types.ObjectId, ref:'Project'},
    telegramChatId: {type: String, required: true},
    description:{type:String, required:true},
    dueDate:{type:Date, required:true},
    isCompleted:{type:Boolean,default:false}
})

const taskModel = mongoose.model('Task', TaskSchema);

export default taskModel;