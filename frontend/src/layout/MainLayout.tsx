import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-row bg-gray-50 dark:bg-gray-900 w-full">
    
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="w-full pt-12 pb-4 bg-gray-50 dark:bg-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}