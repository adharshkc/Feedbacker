import { z } from "zod";

export const feedbackSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Email is invalid"),
    message: z.string().min(1, "Description is required")
  });


export type FeedbackFormData = z.infer<typeof feedbackSchema>;