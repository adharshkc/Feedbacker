import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitFeedback } from "../../hooks/useFeedback"; 
import { FeedbackFormData, feedbackSchema } from '../../schemas/feedbackSchema';


const FeedbackForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema)
  });

  const { mutate, status } = useSubmitFeedback();
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const onSubmit = (data: FeedbackFormData) => {
    
    mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true);
        reset();
      }
    });
  };

  const handleReset = () => {
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto mt-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h2>
        <p className="text-gray-600 mb-6">Your feedback has been submitted successfully. We appreciate your input and will review it shortly.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Another Feedback
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Submit Feedback</h2>
        <p className="text-gray-600">We value your input to improve our services</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={5}
            placeholder="Please provide detailed information about your feedback"
            className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-gray-700 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Reset
          </button>
          
          <button
            type="submit"
            disabled={status === "pending"}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${status === "pending" ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {status === "pending" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </div>
        
        {status === "error" && (
          <p className="text-red-500 text-xs mt-2 text-center">
            { "An error occurred during submission."}
          </p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;