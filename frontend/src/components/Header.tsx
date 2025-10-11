import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { title: "Posts", href: "/posts" },
  { title: "Users", href: "/users" },
];

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-b border-slate-200 dark:border-gray-700 shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">

        {/* Sol menü */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-800 dark:text-gray-100 hover:opacity-90 transition"
          >
            Home
          </Link>

          <nav className="flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-slate-700 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-400 transition font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sağ logout */}
        <div>
          <Button
            onClick={logout}
            variant="ghost"
            className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};