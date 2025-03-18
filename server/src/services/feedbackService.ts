import Feedback from "../models/feedback";


export const createFeedback = async (userId: number, message: any): Promise<any> => {
    return await new Feedback({ userId, message }).save();
  };


export const getUserFeedbacks = async (userId: number): Promise<any[]> => {
    return await Feedback.find({ userId });
  };

  export const getAllFeedbacks = async (): Promise<any[]> => {
    return await Feedback.find();
  };


  export const getFeedbackAnalytics = async () => {
    const totalFeedbacks = await Feedback.countDocuments();
    const feedbackPerUser = await Feedback.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
    ]);
  
    return { totalFeedbacks, feedbackPerUser };
  };