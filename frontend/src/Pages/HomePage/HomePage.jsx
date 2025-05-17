import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trophy,
  Award,
  Crown,
  Sparkles,
  Star,
  Loader2,
  User,
  Info,
} from "lucide-react";
import LoggedInNavbar from "../../components/Navbar/LoggedInNavbar";
import { useNavigate } from "react-router-dom";

const ROWS_PER_PAGE = 10;

export default function HomePage() {
  const [highlightedUser, setHighlightedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [leaders, setLeaders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getVibers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/top-vibers?page=${currentPage}&limit=${ROWS_PER_PAGE}`
      );
      setLeaders(res.data.topVibers || []);
      setTotalPages(Math.ceil((res.data.total || 0) / ROWS_PER_PAGE));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch vibers:", err);
      setError("Failed to load leaderboard. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVibers();
  }, [currentPage]);

  const getMedal = (position) => {
    switch (position) {
      case 0:
        return (
          <Trophy
            className="text-yellow-400 w-6 h-6"
            aria-label="First place"
          />
        );
      case 1:
        return (
          <Award className="text-gray-400 w-6 h-6" aria-label="Second place" />
        );
      case 2:
        return (
          <Award className="text-amber-700 w-6 h-6" aria-label="Third place" />
        );
      default:
        return null;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of leaderboard when changing pages
      document
        .getElementById("leaderboard-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900">
      <LoggedInNavbar />

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section with animated elements */}
        <div className="flex flex-col items-center mb-12 relative">
          <div className="absolute w-64 h-64 bg-pink-600/30 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute w-32 h-32 bg-indigo-500/40 rounded-full filter blur-3xl -translate-x-20 animate-pulse"
            style={{ animationDuration: "7s" }}
          />
          <div
            className="absolute w-48 h-48 bg-purple-500/30 rounded-full filter blur-3xl translate-x-20 translate-y-12 animate-pulse"
            style={{ animationDuration: "9s" }}
          />

          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-3 z-10 text-center">
            Top Vibers
          </h1>
          <p className="text-pink-200 text-lg mb-8 max-w-md text-center z-10">
            See who's creating the best beats and breaking records
          </p>
        </div>

        {/* Enhanced layout: left for description, right for leaderboard */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left side description */}
          <section className="lg:w-1/3 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white flex flex-col justify-center h-fit shadow-xl border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">
              About Vibe Verse
            </h2>
            <p className="mb-4 text-lg">
              Vibe Verse is a community-driven platform where people can compete
              and find like minded people.
            </p>
            <p className="mb-4 text-lg">
              Participate in contests, raise your vibe score!! Show who is the
              craziest and meet other crazies!!!
            </p>

            <div className="mt-4 p-4 bg-indigo-900/40 rounded-xl border border-indigo-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-cyan-300 w-5 h-5" />
                <h3 className="font-semibold text-cyan-300">How to Rank Up</h3>
              </div>
              <p className="text-sm text-pink-100">
                Complete Contests engage with the community to earn points and
                increase your vibe score. The more active you are, the higher
                you'll climb!
              </p>
            </div>
          </section>

          {/* Right side leaderboard */}
          <section id="leaderboard-section" className="lg:w-2/3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 transition-all duration-300">
              <div className="bg-indigo-900/60 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="text-yellow-400 w-8 h-8" />
                  <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
                </div>

                <button
                  onClick={() => getVibers()}
                  className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-1 cursor-pointer rounded-md flex items-center gap-1 transition-colors duration-300"
                  disabled={loading}
                  aria-label="Refresh leaderboard"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>Refresh</>
                  )}
                </button>
              </div>

              {error ? (
                <div className="p-8 text-center">
                  <p className="text-pink-200 mb-4">{error}</p>
                  <button
                    onClick={getVibers}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-white font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-12 text-pink-200 text-sm font-medium px-6 py-4 border-b border-white/10">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5 md:col-span-6">Player</div>
                    <div className="col-span-3 md:col-span-2 text-center">
                      Crazy Score
                    </div>
                    <div className="col-span-3 text-right">Vibe Score</div>
                  </div>

                  {loading && leaders.length === 0 ? (
                    <div className="flex justify-center items-center p-12">
                      <Loader2 className="h-8 w-8 text-pink-300 animate-spin" />
                    </div>
                  ) : (
                    <div className="divide-y divide-white/10">
                      {leaders.length > 0 ? (
                        leaders.map((leader, idx) => {
                          const overallIndex =
                            (currentPage - 1) * ROWS_PER_PAGE + idx;
                          return (
                            <div
                              key={leader._id}
                              className={`grid grid-cols-12 items-center px-6 py-4 ${
                                overallIndex === 0
                                  ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10"
                                  : overallIndex === 1
                                  ? "bg-gradient-to-r from-gray-400/20 to-gray-500/5"
                                  : overallIndex === 2
                                  ? "bg-gradient-to-r from-amber-700/20 to-amber-800/5"
                                  : "hover:bg-white/5"
                              } transition-all duration-300 ${
                                highlightedUser === leader._id
                                  ? "bg-indigo-600/30"
                                  : ""
                              }`}
                              onMouseEnter={() =>
                                setHighlightedUser(leader._id)
                              }
                              onMouseLeave={() => setHighlightedUser(null)}
                            >
                              <div className="col-span-1 flex items-center">
                                {getMedal(overallIndex) || (
                                  <span className="text-white font-bold ml-2">
                                    {overallIndex + 1}
                                  </span>
                                )}
                              </div>

                              <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                                <div
                                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-xl"
                                  aria-label="User avatar"
                                >
                                  {leader.avatar || (
                                    <User className="w-5 h-5 text-white" />
                                  )}
                                </div>
                                <div>
                                  <div
                                    className="font-bold text-white cursor-pointer hover:text-pink-300 transition-colors"
                                    onClick={() => {
                                      navigate(`/view-profile/${leader._id}`);
                                    }}
                                  >
                                    {leader.username}
                                  </div>
                                  {overallIndex < 3 && (
                                    <div className="text-xs text-pink-300 flex items-center gap-1 mt-1">
                                      <Sparkles className="w-3 h-3" /> Top
                                      performer
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-span-3 md:col-span-2 text-center">
                                <div className="bg-indigo-900/40 rounded-lg px-3 py-1 inline-flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="text-white">
                                    {leader.crazinessLevel || 0}
                                  </span>
                                </div>
                              </div>

                              <div className="col-span-3 text-right font-mono font-bold text-white">
                                {leader.vibeScore?.toLocaleString() || "0"}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center text-pink-200">
                          No vibers found. Be the first to join the leaderboard!
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between px-6 py-4 bg-indigo-900/40 border-t border-white/10">
                    <button
                      className="px-3 py-1 rounded bg-purple-800 hover:bg-purple-700 text-white font-semibold disabled:opacity-50 transition-colors"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                      aria-label="Previous page"
                    >
                      Previous
                    </button>

                    <div className="hidden md:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        )
                        .map((page, index, array) => {
                          // Add ellipsis if there are gaps in the sequence
                          if (index > 0 && page - array[index - 1] > 1) {
                            return (
                              <div
                                key={`ellipsis-${page}`}
                                className="flex items-center"
                              >
                                <span className="text-pink-200 mx-1">...</span>
                                <button
                                  onClick={() => handlePageChange(page)}
                                  className={`w-8 h-8 flex items-center justify-center rounded-full 
                                    ${
                                      currentPage === page
                                        ? "bg-purple-700 text-white"
                                        : "text-pink-200 hover:bg-white/10"
                                    }`}
                                  disabled={loading}
                                >
                                  {page}
                                </button>
                              </div>
                            );
                          }
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-8 h-8 flex items-center justify-center rounded-full 
                                ${
                                  currentPage === page
                                    ? "bg-purple-700 text-white"
                                    : "text-pink-200 hover:bg-white/10"
                                }`}
                              disabled={loading}
                            >
                              {page}
                            </button>
                          );
                        })}
                    </div>

                    <div className="text-pink-200 md:hidden">
                      Page {currentPage} of {totalPages}
                    </div>

                    <button
                      className="px-3 py-1 rounded bg-purple-800 hover:bg-purple-700 text-white font-semibold disabled:opacity-50 transition-colors"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading}
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Call to action section */}
        <div className="mt-12 mb-8 max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-800/50 to-purple-800/50 backdrop-blur-md border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to make some noise?
            </h2>
            <p className="text-pink-200 mb-6">
              Join the Top Vibers community today and show off your musical
              talent!
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-3 bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
