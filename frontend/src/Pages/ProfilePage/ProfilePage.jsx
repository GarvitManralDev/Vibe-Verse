import {
  Music,
  Trophy,
  Star,
  Zap,
  Instagram,
  Camera,
  Heart,
  PenLine,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import LoggedInNavbar from "../../components/Navbar/LoggedInNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

// Avatar options for editing
const avatarOptions = [
  "🧙",
  "👑",
  "🎵",
  "🦊",
  "🔥",
  "🎧",
  "😎",
  "🎤",
  "🎸",
  "🎷",
  "🐉",
  "🦄",
  "🐺",
  "🦁",
  "🐵",
  "🐬",
  "🦋",
  "🌟",
  "🌈",
  "⚡",
  "🍀",
  "🎮",
  "🚀",
  "🛸",
  "🎯",
  "💎",
  "🥁",
  "🎹",
  "📀",
  "🎺",
  "🐝",
  "🐞",
  "🦚",
  "🦢",
  "🦩",
  "🦦",
  "🦥",
  "🐢",
  "🐍",
  "🦖",
];

const socialPlatforms = [
  {
    key: "insta",
    label: "Instagram",
    icon: Instagram,
    color: "text-pink-400",
    url: (v) => `https://instagram.com/${v}`,
  },
  {
    key: "snap",
    label: "Snapchat",
    icon: Camera,
    color: "text-yellow-400",
    url: (v) => `https://snapchat.com/add/${v}`,
  },
  {
    key: "tinder",
    label: "Tinder",
    icon: Heart,
    color: "text-red-400",
    url: (v) => `https://tinder.com/@${v}`,
  },
  {
    key: "bumble",
    label: "Bumble",
    icon: PenLine,
    color: "text-yellow-300",
    url: (v) => `https://bumble.com/@${v}`,
  },
  {
    key: "hinge",
    label: "Hinge",
    icon: MessageCircle,
    color: "text-purple-400",
    url: (v) => `https://hinge.co/@${v}`,
  },
];

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState();
  const [currentAvatar, setCurrentAvatar] = useState();
  const [totalContests, setTotalContests] = useState(0);
  const [vibeScore, setVibeScore] = useState(0);
  const [crazinessLevel, setCrazinessLevel] = useState(0);
  const [topScorerStreak, setTopScorerStreak] = useState(0);
  const [insta, setInsta] = useState("");
  const [hinge, setHinge] = useState("");
  const [bumble, setBumble] = useState("");
  const [tinder, setTinder] = useState("");
  const [snap, setSnap] = useState("");
  const [topGenres, setTopGenres] = useState([]);
  const [editingSocials, setEditingSocials] = useState(false);

  const [socialInputs, setSocialInputs] = useState({
    insta: "",
    snap: "",
    tinder: "",
    bumble: "",
    hinge: "",
  });

  // Helper to set socials after update
  const setSocials = ({ insta, snap, tinder, bumble, hinge }) => {
    setInsta(insta);
    setSnap(snap);
    setTinder(tinder);
    setBumble(bumble);
    setHinge(hinge);
  };

  // Only show top 3 genres from backend data
  function getTopThreeContestTypes(contestTypesObj) {
    return Object.entries(contestTypesObj || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }

  const getUser = async () => {
    try {
      const token = localStorage.getItem("Vibetoken");
      if (!token) throw new Error("Token not found");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data;
      setName(data.username);
      setCurrentAvatar(data.avatar);
      setAvatar(data.avatar);
      setTotalContests(data.contestsParticipated);
      setVibeScore(data.vibeScore);
      setCrazinessLevel(data.crazinessLevel);
      setTopScorerStreak(data.topScorerStreak);
      setInsta(data.insta);
      setHinge(data.hinge);
      setSnap(data.snap);
      setBumble(data.bumble);
      setTinder(data.tinder);
      setTopGenres(getTopThreeContestTypes(data.contestTypes));
      setSocialInputs({
        insta: data.insta,
        snap: data.snap,
        tinder: data.tinder,
        bumble: data.bumble,
        hinge: data.hinge,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("Vibetoken");
      if (!token) throw new Error("Token not found");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update-profile`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data.user;
      setCurrentAvatar(data.avatar);
      setAvatar(data.avatar);
      setInsta(data.insta);
      setHinge(data.hinge);
      setSnap(data.snap);
      setBumble(data.bumble);
      setTinder(data.tinder);
      setSocialInputs({
        insta: data.insta,
        snap: data.snap,
        tinder: data.tinder,
        bumble: data.bumble,
        hinge: data.hinge,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 relative">
      <LoggedInNavbar />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 mb-8 flex flex-col sm:flex-row items-center gap-6 p-8">
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-5xl select-none ring-4 ring-pink-400/30 shadow-lg">
              {currentAvatar}
              <span className="absolute -bottom-2 right-0 bg-pink-400 text-white text-xs px-2 py-0.5 rounded-full shadow-md font-semibold animate-pulse select-none">
                You
              </span>
            </div>
            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {name}
              </h1>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-lg text-white">
                  {totalContests} Contests Participated
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-pink-400" />
                  <span>
                    Vibe Score: <strong>{vibeScore}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>
                    Craziness Level: <strong>{crazinessLevel}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Picker - always visible */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Choose Your Avatar
            </h2>
            <div className="flex flex-wrap gap-3 justify-center mb-6 max-h-72 overflow-y-auto">
              {avatarOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={async () => {
                    setAvatar(option);
                    await updateUserProfile({ avatar: option });
                    setCurrentAvatar(option);
                  }}
                  className={`text-4xl rounded-full w-14 h-14 flex items-center justify-center cursor-pointer select-none transition-all duration-150 ${
                    currentAvatar === option
                      ? "ring-4 ring-yellow-400 scale-110"
                      : "hover:ring-2 hover:ring-pink-300"
                  }`}
                  aria-label={`Select avatar ${option}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Social Media - always visible */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Social Media</h2>
              <button
                onClick={async () => {
                  if (editingSocials) {
                    await updateUserProfile({
                      insta: socialInputs.insta,
                      snap: socialInputs.snap,
                      tinder: socialInputs.tinder,
                      bumble: socialInputs.bumble,
                      hinge: socialInputs.hinge,
                    });
                    setSocials({ ...socialInputs });
                  } else {
                    setSocialInputs({
                      insta,
                      snap,
                      tinder,
                      bumble,
                      hinge,
                    });
                  }
                  setEditingSocials(!editingSocials);
                }}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              >
                {editingSocials ? "Save Changes" : "Edit Profiles"}
              </button>
            </div>
            {/* Always show current links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {socialPlatforms.map(
                ({ key, label, icon: Icon, color, url }) =>
                  !!eval(key) && (
                    <a
                      key={key}
                      href={url(eval(key))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition"
                    >
                      <Icon className={`w-7 h-7 ${color} flex-shrink-0`} />
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">
                          {label}
                        </span>
                        <span className="text-white/80 underline">
                          {eval(key)}
                        </span>
                      </div>
                      <ExternalLink className="w-5 h-5 text-white/70 ml-auto" />
                    </a>
                  )
              )}
              {/* If no socials, show a message */}
              {!insta && !snap && !tinder && !bumble && !hinge && (
                <span className="text-white/60 italic col-span-full">
                  No socials shared.
                </span>
              )}
            </div>
            {/* If editing, show input fields */}
            {editingSocials && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialPlatforms.map(({ key, label, icon: Icon, color }) => (
                  <div key={key} className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-white">
                      <Icon className={`w-5 h-5 ${color}`} />
                      <span>{label}</span>
                    </div>
                    <input
                      type="text"
                      value={socialInputs[key] || ""}
                      onChange={(e) =>
                        setSocialInputs((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:outline-none"
                      placeholder={`${label} username`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Genres */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Top Genres</h2>
            {topGenres.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
                {topGenres.map((genre, i) => (
                  <li
                    key={i}
                    className="bg-white/5 p-4 rounded-xl flex items-center justify-between"
                  >
                    <span className="capitalize">{genre.name}</span>
                    <span className="text-sm text-white/70">
                      Played {genre.count} times
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/70">No genres data available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
