import { User } from "lucide-react";
import TodoList from "../components/TodoList";
import { Link } from "react-router-dom";

const Index = () => {

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  };

  const userName = localStorage.getItem("name");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Welcome, {userName || "Guest"}!
              </p>
              <p className="text-sm text-slate-600">
                {localStorage.getItem("email")}
              </p>
            </div>
          </div>
          {userName ? (
            <button
              onClick={handleLogout}
              className="p-3 text-slate-600 border border-slate-300 rounded hover:bg-slate-100 hover:text-slate-900 text-sm cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex items-center gap-5">
              <span className="text-blue-600 cursor-pointer">Login</span>
              <Link
                to="/signup"
                className="outline-none p-3 text-slate-600 border border-slate-300 rounded hover:bg-slate-100 hover:text-slate-900 text-sm cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
};

export default Index;
