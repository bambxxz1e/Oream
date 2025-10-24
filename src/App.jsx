import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Intro from "./pages/Intro";
import Goal1 from "./pages/GoalSetting1";
import Join from "./pages/JoinPage";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import Hiking_log from "./pages/Hiking_log";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/goal1" element={<Goal1 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hikinglog" element={<Hiking_log />} />
      </Routes>
    </BrowserRouter>
  );
}
