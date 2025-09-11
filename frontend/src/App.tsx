import SiteRoutes from "./router/SiteRoutes"
import "./App.css";
import { Toaster } from "sonner";

export default function App() {
  return (
      <>
          <SiteRoutes />
          <Toaster />
      </>
  )
}