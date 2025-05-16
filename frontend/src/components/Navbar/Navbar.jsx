import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-900/80 backdrop-blur-md z-20 flex justify-between items-center px-8 py-4 text-white font-bold tracking-wide">
      <div
        className="text-2xl cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        VibeVerse
      </div>
      <ul className="flex space-x-8 text-lg">
        <li
          className="hover:text-yellow-400 cursor-pointer transition"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          className="hover:text-yellow-400 cursor-pointer transition"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </li>
        <li
          className="hover:text-yellow-400 cursor-pointer transition"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </li>
      </ul>
    </nav>
  );
}
