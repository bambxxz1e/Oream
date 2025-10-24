import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Intro from "./pages/Intro";
import Goal1 from "./pages/GoalSetting1";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/goal1" element={<Goal1 />} />
      </Routes>
    </BrowserRouter>
  );
}
