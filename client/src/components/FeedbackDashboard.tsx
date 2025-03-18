import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm'; 
import FeedbackCardDisplay from './FeedbackCardDisplay';
import { FadeLoader } from 'react-spinners';
import { useFeedback } from '../hooks/useFeedback';

// interface Feedback {
//   id: string;
//   name: string;
//   email: string;
//   category: string;
//   priority: 'low' | 'medium' | 'high' | 'critical';
//   title: string;
//   description: string;
//   status: 'new' | 'in-review' | 'in-progress' | 'resolved' | 'closed';
//   createdAt: string;
//   allowContact: boolean;
// }



const FeedbackDashboard: React.FC = () => {
  const { data: feedbacks, isLoading } = useFeedback();
  const [activeTab, setActiveTab] = useState<"form" | "list">("list");

  console.log(feedbacks)


  if(isLoading){
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <FadeLoader/>
    </div>
  }
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Feedback Management System</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-4 px-6 text-center cursor-pointer ${activeTab === 'list'
              ? 'border-b-2 border-blue-500 font-medium text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
            }`}
          onClick={() => setActiveTab('list')}
        >
          View Feedback
        </button>
        <button
          className={`py-4 px-6 text-center cursor-pointer ${activeTab === 'form'
              ? 'border-b-2 border-blue-500 font-medium text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
            }`}
          onClick={() => setActiveTab('form')}
        >
          Submit Feedback
        </button>
      </div>

      {/* Content */}
      {activeTab === 'form' ? (
        <FeedbackForm />
      ) : (
        <FeedbackCardDisplay
          feedbacks={feedbacks}
        />
      )}
    </div>
  );
};

export default FeedbackDashboard;