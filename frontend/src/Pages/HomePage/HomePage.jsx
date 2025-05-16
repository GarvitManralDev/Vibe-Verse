import { useState } from "react";
import { Trophy, Zap, Star, Music, Award, Crown, Sparkles } from "lucide-react";
import LoggedInNavbar from "../../components/Navbar/LoggedInNavbar";

// Enhanced data with additional properties
const leaders = [
  {
    id: 1,
    name: "ElectroEmpress",
    score: 9821,
    level: 42,
    streak: 15,
    avatar: "👑",
  },
  {
    id: 2,
    name: "GrooveGuru",
    score: 9402,
    level: 39,
    streak: 7,
    avatar: "🧙",
  },
  {
    id: 3,
    name: "BeatBender",
    score: 9210,
    level: 37,
    streak: 12,
    avatar: "🎵",
  },
  { id: 4, name: "VibeVixen", score: 8999, level: 36, streak: 5, avatar: "🦊" },
  { id: 5, name: "FunkFiend", score: 8850, level: 35, streak: 3, avatar: "🔥" },
  {
    id: 6,
    name: "RhythmRuler",
    score: 8700,
    level: 33,
    streak: 9,
    avatar: "👾",
  },
  { id: 7, name: "BassBoss", score: 8600, level: 31, streak: 4, avatar: "🎧" },
];

export default function HomePage() {
  const [highlightedUser, setHighlightedUser] = useState(null);

  // Get medal for top 3 positions
  const getMedal = (position) => {
    switch (position) {
      case 0:
        return <Trophy className="text-yellow-400" />;
      case 1:
        return <Award className="text-gray-400" />;
      case 2:
        return <Award className="text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900">
      <LoggedInNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Animated header */}
        <div className="flex flex-col items-center mb-12 relative">
          <div className="absolute w-64 h-64 bg-pink-600/30 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute w-32 h-32 bg-indigo-500/40 rounded-full filter blur-3xl -translate-x-20 animate-pulse"
            style={{ animationDuration: "7s" }}
          />

          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-3 z-10">
            Top Vibers
          </h1>
          <p className="text-pink-200 text-lg mb-8 max-w-md text-center">
            See who's creating the best beats and breaking records
          </p>
        </div>

        {/* Leaderboard card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20">
            {/* Card header */}
            <div className="bg-indigo-900/60 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="text-yellow-400 w-8 h-8" />
                <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-12 text-pink-200 text-sm font-medium px-6 py-4 border-b border-white/10">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-2 text-center">Craziness Level</div>
              <div className="col-span-2 text-center">
                Contest Top Scorer Streak
              </div>
              <div className="col-span-2 text-right">Score</div>
            </div>

            {/* Leaderboard entries */}
            <div className="divide-y divide-white/10">
              {leaders.map((leader, index) => (
                <div
                  key={leader.id}
                  className={`grid grid-cols-12 items-center px-6 py-4 ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10"
                      : index === 1
                      ? "bg-gradient-to-r from-gray-400/20 to-gray-500/5"
                      : index === 2
                      ? "bg-gradient-to-r from-amber-700/20 to-amber-800/5"
                      : "hover:bg-white/5"
                  } transition-all duration-300 ${
                    highlightedUser === leader.id ? "bg-indigo-600/30" : ""
                  }`}
                  onMouseEnter={() => setHighlightedUser(leader.id)}
                  onMouseLeave={() => setHighlightedUser(null)}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    {getMedal(index) || (
                      <span className="text-white font-bold ml-2">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Player info */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-xl">
                      {leader.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{leader.name}</div>
                      {index < 3 && (
                        <div className="text-xs text-pink-300 flex items-center gap-1 mt-1">
                          <Sparkles className="w-3 h-3" /> Top performer
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Level */}
                  <div className="col-span-2 text-center">
                    <div className="bg-indigo-900/40 rounded-lg px-3 py-1 inline-flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white">{leader.level}</span>
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="col-span-2 text-center">
                    <div className="bg-pink-900/40 rounded-lg px-3 py-1 inline-flex items-center gap-1">
                      <Zap className="w-4 h-4 text-pink-400" />
                      <span className="text-white">{leader.streak}</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-2 text-right font-mono font-bold text-white">
                    {leader.score.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with challenges */}
            <div className="bg-indigo-900/40 p-6">
              <div className="text-white font-medium mb-3">
                Current Challenges
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-700 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">5-Day Streak</div>
                    <div className="text-pink-200 text-xs">
                      2 days remaining
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Beat Master</div>
                    <div className="text-pink-200 text-xs">
                      Create 3 more tracks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
