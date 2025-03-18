import { create } from "zustand";

interface Feedback {
    id: string;
    name: string;
    email: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    status: 'new' | 'in-review' | 'in-progress' | 'resolved' | 'closed';
    createdAt: string;
    allowContact: boolean;
  }

  
  interface FeedbackState {
    feedbacks: Feedback[];
    addFeedback: (feedback: Feedback) => void;
    setFeedbacks: (feedbacks: Feedback[]) => void;
  }

  export const useFeedbackStore = create<FeedbackState>((set) => ({
    feedbacks: [],
    addFeedback: (feedback) =>
      set((state) => ({ feedbacks: [...state.feedbacks, feedback] })),
    setFeedbacks: (feedbacks) => set({ feedbacks }),
  }));