import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import QuizModal from "./QuizModal/QuizModal";
import axios from "axios";
import LoggedInNavbar from "../../components/Navbar/LoggedInNavbar";
import { getCategoryColors, tabColors } from "../../../utils/categoryColors";

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("regular");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [regularCategories, setRegularCategories] = useState([]);
  const [edgyCategories, setEdgyCategories] = useState([]);

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const closeQuiz = () => {
    setShowQuiz(false);
  };

  const getCategories = () => {
    switch (activeTab) {
      case "regular":
        return regularCategories;
      case "edgy":
        return edgyCategories;
      default:
        return regularCategories;
    }
  };

  // Render difficulty stars
  const renderDifficulty = (level) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < level ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
          }`}
        />
      ));
  };

  const handleQuizComplete = async (scores, category) => {
    try {
      const token = localStorage.getItem("Vibetoken");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/scores`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newVibeScore: scores.vibeScore,
            newCrazyScore: scores.crazyScore,
            categoryName: selectedCategory.name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update scores");
      }

      setToastMessage(
        `✅ Scores updated! +${scores.vibeScore} Vibe, +${scores.crazyScore} Crazy`
      );

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);

      setShowQuiz(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error updating scores:", error);
      setToastMessage("❌ Failed to update scores");
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };

  // Process and normalize player data
  const normalizePlayerData = (categories) => {
    return categories.map((category) => {
      // Ensure topPlayers exists and has a consistent structure
      let normalizedTopPlayers = [];

      if (category.topPlayers && category.topPlayers.length > 0) {
        normalizedTopPlayers = category.topPlayers.map((player) => {
          return {
            userId: player.userId || player._id,
            username: player.username || player.name || "Anonymous Player",
            avatar: player.avatar || "",
            vibeScore: player.vibeScore || player.score || 0,
          };
        });
      }

      return {
        ...category,
        topPlayers: normalizedTopPlayers,
        // Get color info from our centralized system
        colorInfo: getCategoryColors(category.id),
      };
    });
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`
      );

      // Process and normalize data
      const processedRegular = normalizePlayerData(response.data.regular);
      const processedEdgy = normalizePlayerData(response.data.edgy);

      setRegularCategories(processedRegular);
      setEdgyCategories(processedEdgy);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <LoggedInNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
            {toastMessage}
          </div>
        )}
        {/* Header with background animation */}
        <header className="relative overflow-hidden py-12 px-4 text-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 top-10 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl animate-pulse"></div>
            <div
              className="absolute right-10 top-20 w-72 h-72 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse"
              style={{ animationDuration: "8s" }}
            ></div>
            <div
              className="absolute left-1/2 bottom-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"
              style={{ animationDuration: "10s" }}
            ></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text leading-[2]  bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
              Contest Categories
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Choose your battleground and test your knowledge against players
              worldwide!
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 relative z-10">
          {/* Category tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-800/70 backdrop-blur-lg rounded-full p-1.5 inline-flex">
              <button
                onClick={() => setActiveTab("regular")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "regular"
                    ? `bg-gradient-to-r ${tabColors.regular.active} text-white shadow-lg`
                    : `text-gray-300 ${tabColors.regular.hover}`
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setActiveTab("edgy")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "edgy"
                    ? `bg-gradient-to-r ${tabColors.edgy.active} text-white shadow-lg`
                    : `text-gray-300 ${tabColors.edgy.hover}`
                }`}
              >
                Edgy 18+
              </button>
            </div>
          </div>

          {/* Featured category - only show if there's a selected category */}
          {selectedCategory && (
            <div className="mb-12 rounded-2xl overflow-hidden bg-gray-800/60 backdrop-blur-sm shadow-xl">
              <div
                className={`bg-gradient-to-r ${selectedCategory.colorInfo.gradient} p-6`}
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-white mb-4 flex items-center opacity-80 hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back to categories
                </button>

                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="ml-4">
                      <div
                        className={`text-xs font-semibold uppercase tracking-wider ${selectedCategory.colorInfo.textColor}`}
                      >
                        {selectedCategory.age
                          ? `${selectedCategory.age} Category`
                          : "General Knowledge"}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {selectedCategory.name}
                      </h2>
                      <p className="text-gray-300 text-sm md:text-base">
                        {selectedCategory.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex mr-3">
                          {renderDifficulty(selectedCategory.difficulty)}
                        </div>
                        <span className="text-gray-400 text-sm">
                          Played{" "}
                          {(selectedCategory.playCount ?? 0).toLocaleString()}{" "}
                          times
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-6 py-3 rounded-full shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
                    onClick={startQuiz}
                  >
                    Start Contest
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Top Players</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedCategory.topPlayers.map((player, i) => (
                    <div
                      key={i}
                      className={`bg-gray-700/60 rounded-xl p-4 border-l-4 ${
                        i === 0
                          ? "border-yellow-400"
                          : i === 1
                          ? "border-gray-400"
                          : "border-amber-700"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 font-bold ${
                            i === 0
                              ? "bg-yellow-400 text-gray-900"
                              : i === 1
                              ? "bg-gray-400 text-gray-900"
                              : "bg-amber-700 text-gray-200"
                          }`}
                        >
                          {i + 1}
                        </div>
                        <div className="font-medium">{player.username}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">Score</div>
                        <div className="font-bold text-lg">
                          {(player.vibeScore ?? 0).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Categories grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCategories().map((category) => (
              <div
                key={category.id}
                className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-pink-900/20 transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedCategory(category)}
              >
                <div
                  className={`bg-gradient-to-r ${category.colorInfo.gradient} p-5`}
                >
                  <div className="flex justify-between items-start mb-3">
                    {category.age && (
                      <span className="bg-black/30 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        {category.age}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <p className={`text-sm ${category.colorInfo.textColor}`}>
                    {category.description}
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderDifficulty(category.difficulty)}
                      </div>
                      <span className="text-xs text-gray-400">Difficulty</span>
                    </div>

                    <div className="text-gray-400 text-sm flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                      Played {(category.playCount ?? 0).toLocaleString()} times
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {category.topPlayers &&
                        category.topPlayers.slice(0, 3).map((player, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-800 flex items-center justify-center text-xs font-bold"
                          >
                            {player.avatar || i + 1}
                          </div>
                        ))}
                      {/* Fallback if no top players */}
                      {(!category.topPlayers ||
                        category.topPlayers.length === 0) &&
                        Array(3)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-800 flex items-center justify-center text-xs font-bold"
                            >
                              {i + 1}
                            </div>
                          ))}
                    </div>

                    <button
                      className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-full flex items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Details <ChevronRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Render Quiz Modal when active */}
        {showQuiz && selectedCategory && (
          <QuizModal
            category={selectedCategory}
            onClose={closeQuiz}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </>
  );
}
