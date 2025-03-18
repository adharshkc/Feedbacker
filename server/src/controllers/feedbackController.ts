import { Request, Response } from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackAnalytics,
  getUserFeedbacks,
} from "../services/feedbackService";

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req?.user;
    const message = req.body;
    console.log(id);

    const feedback = await createFeedback(id, message.message);
    res
      .status(201)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.user!;
    console.log(id, req.params.userId);
    if (id !== Number(req.params.userId)) {
      res.status(403).json({ message: "Unauthorized to view this feedback" });
      return;
    }

    const feedbacks = await getUserFeedbacks(id);
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Get User Feedback Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllFeedbacksController = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log(req.user)
    const feedbacks = await getAllFeedbacks();
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Get All Feedbacks Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFeedbackAnalyticsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const analytics = await getFeedbackAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    console.error("Get Feedback Analytics Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
