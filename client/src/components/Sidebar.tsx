import  { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  LogOut, 
} from 'lucide-react';
import FeedbackCard from './FeedbackDashboard';
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  
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
          <h2 className="text-xl font-bold">My App</h2>
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
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
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
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>
        
        {/* <main className="p-6">
          <h2 className="text-5xl text-center font-bold mb-4">Welcome to Feedbacker App</h2>
          <p className="text-gray-600 text-xl text-center">This system allows you to easily submit feedback on your experience. Your input is crucial for our ongoing improvement.</p>
        </main> */}
        <main>
            {/* <FeedbackForm/> */}
            <FeedbackCard/>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;