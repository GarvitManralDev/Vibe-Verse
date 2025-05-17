import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import ContestsPage from "./Pages/ContestsPage/ContestsPage";
import ViewProfileOnly from "./Pages/ViewProfileOnly/ViewProfileOnly";
import Friends from "./Pages/Friends/Friends";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/view-profile/:userId" element={<ViewProfileOnly />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
