import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Discover from "./pages/Discover";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-paper font-body">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
