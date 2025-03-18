import React from 'react';
import { Bell, HelpCircle, Bug, Star, Settings, User, AlertCircle } from 'lucide-react';

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
}

interface FeedbackCardDisplayProps {
    feedbacks: Feedback[];
    onStatusChange?: (id: string, status: Feedback['status']) => void;
}

const FeedbackCardDisplay: React.FC<FeedbackCardDisplayProps> = ({
    feedbacks,
}) => {
    // Function to get appropriate icon based on category
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'bug':
                return <Bug className="h-5 w-5 text-red-600" />;
            case 'feature':
                return <Star className="h-5 w-5 text-purple-600" />;
            case 'improvement':
                return <Settings className="h-5 w-5 text-blue-600" />;
            case 'question':
                return <HelpCircle className="h-5 w-5 text-yellow-600" />;
            default:
                return <Bell className="h-5 w-5 text-gray-600" />;
        }
    };

    // Function to get color based on priority
    const getPriorityColor = (priority: Feedback['priority']) => {
        switch (priority) {
            case 'critical':
                return 'bg-red-100 text-red-800';
            case 'high':
                return 'bg-orange-100 text-orange-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to get color based on status
    const getStatusColor = (status: Feedback['status']) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'in-review':
                return 'bg-purple-100 text-purple-800';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
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
                    {feedbacks.map((feedback) => (
                        <div key={feedback.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div className="text-sm font-medium text-gray-500">{formatDate(feedback.createdAt)}</div>
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                                        {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)}
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center">
                                    {getCategoryIcon(feedback.category)}
                                    <h3 className="ml-2 text-lg font-medium text-gray-900 truncate" title={feedback.title}>
                                        {feedback.title}
                                    </h3>
                                </div>

                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {feedback.description}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="ml-1 text-sm text-gray-500">{feedback.name}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-5 py-3 bg-gray-50 flex justify-between items-center">
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                                    {feedback.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </div>

                                {/* {onStatusChange && (
                                    <select
                                        value={feedback.status}
                                        onChange={(e) => onStatusChange(feedback.id, e.target.value as Feedback['status'])}
                                        className="text-sm border border-gray-300 rounded-md py-1 pl-2 pr-8 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="new">New</option>
                                        <option value="in-review">In Review</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackCardDisplay;