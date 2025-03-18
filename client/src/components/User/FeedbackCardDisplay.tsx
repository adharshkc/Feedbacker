import React from 'react';
import { User, AlertCircle } from 'lucide-react';

interface Feedback {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

interface FeedbackCardDisplayProps {
    feedbacks: Feedback[];
}

const FeedbackCardDisplay: React.FC<FeedbackCardDisplayProps> = ({
    feedbacks,
}) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return "Invalid date"; 
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid date"; 
        
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Feedback Entries</h2>
                <span className="text-sm text-gray-500">{feedbacks?.length} entries found</span>
            </div>

            {feedbacks?.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                        <AlertCircle className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No feedback entries found</h3>
                    <p className="mt-1 text-sm text-gray-500">Submit new feedback to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbacks?.map((feedback) => (
                        <div key={feedback.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div className="text-sm font-medium text-gray-500">{formatDate(feedback.created_at)}</div>
                                </div>
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {feedback.message}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="ml-1 text-sm text-gray-500">{feedback.name}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-5 py-3 bg-gray-50 flex justify-between items-center">
                               
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FeedbackCardDisplay;