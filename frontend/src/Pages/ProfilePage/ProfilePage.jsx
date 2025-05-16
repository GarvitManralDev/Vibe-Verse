import {
  Music,
  Trophy,
  Star,
  Zap,
  TrendingUp,
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
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [editingSocials, setEditingSocials] = useState(false);

  const [socialInputs, setSocialInputs] = useState({
    instagram: "",
    snapchat: "",
    tinder: "",
    bumble: "",
    hinge: "",
  });

  const setSocials = ({ instagram, snapchat, tinder, bumble, hinge }) => {
    setInsta(instagram);
    setSnap(snapchat);
    setTinder(tinder);
    setBumble(bumble);
    setHinge(hinge);
  };

  function getTopThreeContestTypes(contestTypesObj) {
    return Object.entries(contestTypesObj)
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;
      setName(data.username);
      setCurrentAvatar(data.avatar);
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
        instagram: data.insta,
        snapchat: data.snap,
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.user;

      // Update your local state with the new user info
      setCurrentAvatar(data.avatar);
      setInsta(data.insta);
      setHinge(data.hinge);
      setSnap(data.snap);
      setBumble(data.bumble);
      setTinder(data.tinder);

      // Optionally, update your socialInputs if you use that for form inputs
      setSocialInputs({
        instagram: data.insta,
        snapchat: data.snap,
        tinder: data.tinder,
        bumble: data.bumble,
        hinge: data.hinge,
      });

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 relative">
      <LoggedInNavbar />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="absolute w-64 h-64 bg-pink-600/30 rounded-full filter blur-3xl animate-pulse -top-20 -left-20" />

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 mb-8 flex flex-col sm:flex-row items-center gap-6 p-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-4xl cursor-pointer select-none">
              {currentAvatar}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{name}</h1>
              <div className="mt-2 flex items-center gap-2">
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
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>
                    Top Scorer Streak: <strong>{topScorerStreak}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Choose Your Avatar
              </h2>
              <button
                onClick={async () => {
                  if (editingAvatar) {
                    await updateUserProfile({ avatar });
                    setCurrentAvatar(avatar);
                  } else {
                    setAvatar(currentAvatar);
                  }
                  setEditingAvatar(!editingAvatar);
                }}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition"
              >
                {editingAvatar ? "Save Changes" : "Edit Avatar"}
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {editingAvatar &&
                avatarOptions.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setAvatar(option)}
                    className={`text-4xl rounded-full w-16 h-16 flex items-center justify-center cursor-pointer select-none transition ${
                      avatar === option
                        ? "ring-4 ring-yellow-400 scale-110"
                        : "hover:ring-2 hover:ring-yellow-300"
                    }`}
                    aria-label={`Select avatar ${option}`}
                  >
                    {option}
                  </button>
                ))}
              {!editingAvatar && (
                <div className="text-4xl rounded-full w-16 h-16 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 ring-4 ring-yellow-400">
                  {currentAvatar}
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Social Media</h2>
              <button
                onClick={async () => {
                  if (editingSocials) {
                    await updateUserProfile({
                      insta: socialInputs.instagram,
                      snap: socialInputs.snapchat,
                      tinder: socialInputs.tinder,
                      bumble: socialInputs.bumble,
                      hinge: socialInputs.hinge,
                    });
                    setSocials({ ...socialInputs });
                  } else {
                    setSocialInputs({
                      instagram: insta,
                      snapchat: snap,
                      tinder: tinder,
                      bumble: bumble,
                      hinge: hinge,
                    });
                  }
                  setEditingSocials(!editingSocials);
                }}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition"
              >
                {editingSocials ? "Save Changes" : "Edit Profiles"}
              </button>
            </div>

            {editingSocials ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Instagram",
                    icon: Instagram,
                    color: "pink-400",
                    value: "instagram",
                  },
                  {
                    label: "Snapchat",
                    icon: Camera,
                    color: "yellow-400",
                    value: "snapchat",
                  },
                  {
                    label: "Tinder",
                    icon: Heart,
                    color: "red-400",
                    value: "tinder",
                  },
                  {
                    label: "Bumble",
                    icon: PenLine,
                    color: "yellow-300",
                    value: "bumble",
                  },
                  {
                    label: "Hinge",
                    icon: MessageCircle,
                    color: "purple-400",
                    value: "hinge",
                  },
                ].map(({ label, icon: Icon, color, value }) => (
                  <div key={value} className="bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-white">
                      <Icon className={`w-5 h-5 text-${color}`} />
                      <span>{label}</span>
                    </div>
                    <input
                      type="text"
                      value={socialInputs[value]}
                      onChange={(e) =>
                        setSocialInputs((prev) => ({
                          ...prev,
                          [value]: e.target.value,
                        }))
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:ring-2 focus:outline-none"
                      placeholder={`${label} username`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {insta && (
                  <a
                    href={`https://instagram.com/${insta}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition"
                  >
                    <Instagram className="w-7 h-7 text-pink-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">
                        Instagram
                      </span>
                      <span className="text-white/80 underline">{insta}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/70 ml-auto" />
                  </a>
                )}
                {snap && (
                  <a
                    href={`https://snapchat.com/add/${snap}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition"
                  >
                    <Camera className="w-7 h-7 text-yellow-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Snapchat</span>
                      <span className="text-white/80 underline">{snap}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/70 ml-auto" />
                  </a>
                )}
                {tinder && (
                  <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
                    <Heart className="w-7 h-7 text-red-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Tinder</span>
                      <span className="text-white/80">{tinder}</span>
                    </div>
                  </div>
                )}
                {bumble && (
                  <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
                    <PenLine className="w-7 h-7 text-yellow-300 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Bumble</span>
                      <span className="text-white/80">{bumble}</span>
                    </div>
                  </div>
                )}
                {hinge && (
                  <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-4">
                    <MessageCircle className="w-7 h-7 text-purple-400 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Hinge</span>
                      <span className="text-white/80">{hinge}</span>
                    </div>
                  </div>
                )}
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
