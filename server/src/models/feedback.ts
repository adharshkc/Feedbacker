import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required:true
    },
   message:{
    type:String,
    required:true
   },
   created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;