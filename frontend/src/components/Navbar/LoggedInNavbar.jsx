import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function LoggedInNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("Vibetoken");
    toast.success("Logged out successfully!");
    navigate("/login");
  };
  return (
    <nav className="bg-indigo-950 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div
        className="text-xl font-bold flex items-center cursor-pointer"
        onClick={() => {
          navigate("/home");
        }}
      >
        VibeVerse
      </div>
      <div className="flex gap-6 font-bold">
        <a
          href="#"
          className="hover:text-yellow-300"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </a>
        <a
          href="#"
          className="hover:text-yellow-300"
          onClick={() => {
            navigate("/contests");
          }}
        >
          Contests
        </a>
        <a
          href="#"
          className="hover:text-yellow-300"
          onClick={() => {
            navigate("/friends");
          }}
        >
          Social
        </a>
        <a
          href="#"
          className="hover:text-yellow-300 "
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </a>
        <a
          href="#"
          className="hover:text-yellow-300"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </a>
      </div>
    </nav>
  );
}

export default LoggedInNavbar;
