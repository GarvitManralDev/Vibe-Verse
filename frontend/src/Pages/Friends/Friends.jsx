import { Instagram, Camera, Heart, PenLine, MessageCircle } from "lucide-react";
import LoggedInNavbar from "../../components/Navbar/LoggedInNavbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const socialIcons = {
  insta: Instagram,
  snap: Camera,
  tinder: Heart,
  bumble: PenLine,
  hinge: MessageCircle,
};

const socialColors = {
  insta: "text-pink-400 shadow-pink-400/30",
  snap: "text-yellow-400 shadow-yellow-300/30",
  tinder: "text-red-400 shadow-red-400/30",
  bumble: "text-yellow-300 shadow-yellow-300/30",
  hinge: "text-purple-400 shadow-purple-400/30",
};

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFriends = async () => {
    try {
      const token = localStorage.getItem("Vibetoken");
      if (!token) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFriends(res.data.users || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch friends");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  if (loading)
    return (
      <>
        <LoggedInNavbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center text-white text-xl backdrop-blur-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
          <p className="text-lg tracking-wider">Fetching friends...</p>
        </div>
      </>
    );

  return (
    <>
      <LoggedInNavbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 md:p-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
            🎯 Friend Recommendations
          </h1>
          <p className="text-pink-200 text-lg md:text-xl font-medium mb-2">
            Discover new connections and expand your vibe circle!
          </p>
          <p className="text-purple-200 text-base md:text-lg">
            Connect your socials, reach out, and start vibing with awesome
            people. <br />
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {friends.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4 animate-bounce">🤝</div>
              <p className="text-white text-2xl font-bold mb-2">
                No friends found yet!
              </p>
              <p className="text-pink-200 text-lg">
                Start connecting with people and watch your friend circle grow.
              </p>
            </div>
          )}
          {friends.map(
            ({ _id, username, avatar, insta, snap, tinder, bumble, hinge }) => (
              <div
                key={_id}
                className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 transition-transform duration-200 hover:scale-105 hover:shadow-pink-400/30 group"
              >
                {/* Avatar with glow */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center text-5xl md:text-6xl shadow-lg ring-4 ring-white/20 group-hover:ring-pink-400/40 transition-all duration-200">
                    {avatar || "👤"}
                  </div>
                  <div className="absolute -bottom-2 right-0 bg-pink-400 text-white text-xs px-2 py-0.5 rounded-full shadow-md font-semibold animate-pulse select-none">
                    Viber
                  </div>
                </div>
                <h2 className="text-white text-2xl font-bold tracking-wide">
                  {username}
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {Object.entries({ insta, snap, tinder, bumble, hinge }).map(
                    ([platform, handle]) => {
                      if (!handle) return null;

                      const Icon = socialIcons[platform];
                      const colorClass = socialColors[platform];

                      let url = "#";
                      switch (platform) {
                        case "insta":
                          url = `https://instagram.com/${handle}`;
                          break;
                        case "snap":
                          url = `https://snapchat.com/add/${handle}`;
                          break;
                        case "tinder":
                          url = `https://tinder.com/@${handle}`;
                          break;
                        case "bumble":
                          url = `https://bumble.com/@${handle}`;
                          break;
                        case "hinge":
                          url = `https://hinge.co/@${handle}`;
                          break;
                        default:
                          url = "#";
                      }

                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center justify-center bg-white/10 rounded-xl px-3 py-2 shadow-md ${colorClass} hover:bg-white/20 hover:shadow-lg hover:scale-110 transition-all duration-200`}
                          title={`${username}'s ${
                            platform.charAt(0).toUpperCase() + platform.slice(1)
                          }`}
                        >
                          <Icon className="w-7 h-7 mb-1 drop-shadow" />
                          <span className="text-xs font-semibold break-all max-w-[5rem] text-center">
                            {handle}
                          </span>
                        </a>
                      );
                    }
                  )}
                </div>
                <div className="absolute top-3 right-4 text-xs text-pink-200 font-medium opacity-70 group-hover:opacity-100 transition">
                  {/* Optionally, show a status or badge */}
                  {/* Example: */}
                  {/* Active now */}
                </div>
              </div>
            )
          )}
        </div>

        {/* Motivational footer */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h3 className="text-white text-2xl font-bold mb-2">
            Why connect on Top Vibers?
          </h3>
          <p className="text-pink-200 text-lg mb-1">
            Collaborate. Build your crew. Make memories!
          </p>
          <p className="text-purple-200">
            Every connection is a new opportunity. Don’t be shy-reach out and
            start vibing!
          </p>
        </div>
      </div>
    </>
  );
}
