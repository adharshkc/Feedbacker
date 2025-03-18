import  { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  LogOut, 
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAllFeedback } from '../../hooks/useFeedback';
import { FadeLoader } from 'react-spinners';
import FeedbackCards from './FeedbackCards';

const Sidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const { data: feedbacks, isLoading } = useAllFeedback();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItems = [
    { name: 'Dashboard', icon: Home },
  ];
const onLogout = ()=>{
  localStorage.removeItem("token")
  navigate("/login")
}
if(isLoading){
  <div className="container mx-auto max-w-6xl px-4 py-8">
    <FadeLoader/>
  </div>
}
  return (
    <div className="flex h-screen">
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div className={`
        fixed inset-y-0 left-0 z-30
        w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0
      `}>
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Feedbacker</h2>
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="flex items-center px-4 py-3 text-gray-300 bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <a 
            href="#" 
            onClick={onLogout}
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </a>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4 flex items-center lg:hidden">
          <button 
            onClick={toggleSidebar}
            className="p-1 mr-4"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl text-center font-semibold">Dashboard</h1>
        </header>
        
        <main>
        <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Feedback Management System</h1>
            <FeedbackCards feedbacks={feedbacks}/>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;