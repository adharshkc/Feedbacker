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

const FeedbackCards: React.FC<FeedbackCardDisplayProps> = ({ feedbacks }) => {
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

    const totalFeedbacks = feedbacks?.length;

    const userFeedbackCount: Record<string, number> = {};
    feedbacks?.forEach(({ name }) => {
        userFeedbackCount[name] = (userFeedbackCount[name] || 0) + 1;
    });

    const topUsers = Object.entries(userFeedbackCount)
        .sort((a, b) => b[1] - a[1]) 
        .slice(0, 3) 

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-200 shadow rounded-lg p-5">
                    <h3 className="text-lg font-bold text-gray-800">Total Feedbacks Submitted</h3>
                    <p className="text-2xl mt-7 font-semibold text-blue-600">{totalFeedbacks}</p>
                </div>

                <div className="bg-gray-200 shadow rounded-lg p-5">
                    <h3 className="text-lg font-bold text-gray-800">Top 3 Active Users</h3>
                    {topUsers.length > 0 ? (
                        <ul className="mt-2 space-y-2">
                            {topUsers.map(([name, count]) => (
                                <li key={name} className="flex justify-between text-gray-700">
                                    <span>{name}</span>
                                    <span className="font-semibold">{count} feedbacks</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm">No active users yet.</p>
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Feedback Entries</h2>
                <span className="text-sm text-gray-500">{feedbacks?.length} entries found</span>
            </div>

            {feedbacks?.length === 0 ? (
                <div className="bg-gray-100 shadow rounded-lg p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                        <AlertCircle className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No feedback entries found</h3>
                    <p className="mt-1 text-sm text-gray-500">Submit new feedback to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbacks?.map((feedback) => (
                        <div key={feedback.id} className="bg-gray-100 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div className="text-sm font-medium text-gray-900">{formatDate(feedback.created_at)}</div>
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackCards;
