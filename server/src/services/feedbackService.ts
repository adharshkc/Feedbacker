import { PrismaClient } from "@prisma/client";
import Feedback from "../models/feedback";

const prisma = new PrismaClient();
export const createFeedback = async (userId: number, message: any): Promise<any> => {
    return await new Feedback({ userId, message }).save();
  };


export const getUserFeedbacks = async (userId: number): Promise<any[]> => {
    return await Feedback.find({ userId });
  };

  export const getAllFeedbacks = async (): Promise<any[]> => {
    const feedbacks = await Feedback.find();
    const userIds = feedbacks.map((feedback) => feedback.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true },
    });
    const userMap = new Map(users.map((user) => [user.id, user.name]));
    return feedbacks.map((feedback) => ({
      id: feedback._id,
      userId: feedback.userId,
      name: userMap.get(feedback.userId) || "Unknown",
      message: feedback.message,
      created_at: feedback.created_at,
    }));
  };


  export const getFeedbackAnalytics = async () => {
    const totalFeedbacks = await Feedback.countDocuments();
    const feedbackPerUser = await Feedback.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
    ]);
  
    return { totalFeedbacks, feedbackPerUser };
  };