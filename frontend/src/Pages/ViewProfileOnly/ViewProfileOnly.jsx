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
} from "lucide-react";
import LoggedInNavbar from "../../components/Navbar/LoggedInNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewProfileOnly() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
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

  const { userId } = useParams();

  function getTopThreeContestTypes(contestTypesObj) {
    return Object.entries(contestTypesObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`
      );

      const data = res.data.user;
      console.log(data);
      setName(data.username);
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
    } catch (error) {
      console.error("Error fetching user:", error);
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
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8 text-white">
            <div className="flex flex-col items-center gap-5">
              <div className="text-6xl">{avatar}</div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="grid grid-cols-3 gap-4 mt-4 w-full">
                <div className="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col items-center w-full">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="font-semibold">{totalContests}</span>
                  <span className="text-xs text-white/70">Contests</span>
                </div>
                <div className="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col items-center w-full">
                  <Star className="w-6 h-6 text-blue-400" />
                  <span className="font-semibold">{vibeScore}</span>
                  <span className="text-xs text-white/70">Vibe Score</span>
                </div>
                <div className="bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col items-center w-full">
                  <Zap className="w-6 h-6 text-pink-400" />
                  <span className="font-semibold">{crazinessLevel}</span>
                  <span className="text-xs text-white/70">Craziness</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
              {insta && (
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span>{insta}</span>
                </div>
              )}
              {snap && (
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-yellow-400" />
                  <span>{snap}</span>
                </div>
              )}
              {tinder && (
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>{tinder}</span>
                </div>
              )}
              {bumble && (
                <div className="flex items-center gap-2">
                  <PenLine className="w-5 h-5 text-yellow-300" />
                  <span>{bumble}</span>
                </div>
              )}
              {hinge && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span>{hinge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Top Genres */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Top Genres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {topGenres.map((genre, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/20 rounded-xl p-4 text-white flex flex-col items-center text-center"
                >
                  <Music className="w-8 h-8 text-pink-400 mb-2" />
                  <span className="font-semibold text-lg capitalize">
                    {genre.name}
                  </span>
                  <span className="text-white/70 text-sm">
                    {genre.count} contests
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
