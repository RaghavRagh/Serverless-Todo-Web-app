import { User } from "lucide-react";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";

const Index = () => {

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken"); 

    navigate("/login");
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Welcome, raghav!</p>
              <p className="text-sm text-slate-600">ragh@gmail.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-3 text-slate-600 border border-slate-300 rounded hover:bg-slate-100 hover:text-slate-900 text-sm cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
};

export default Index;
