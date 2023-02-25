import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    allProjects: [{type:mongoose.Schema.Types.ObjectId, ref:'Project', default: []}],
    schedule: [{type: Number, default: []}]
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;
//http://localhost:8080/getSchedule/?id=63fa537f5f0e6abd3e1c06ea