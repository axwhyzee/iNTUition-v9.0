import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema({
    meetingTitle:{type:String, required: true},
    meetingStartTime: {type: Date, required: true},
    meetingLink:{type:String, required:true},
    meetingPassword: {type: String, required: true},
    meetingDate:{type:Date, required:true}
});

const meetingModel = mongoose.model('Meeting', MeetingSchema);

export default meetingModel;