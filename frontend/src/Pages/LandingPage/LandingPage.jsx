import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-pink-500 via-purple-700 to-indigo-900 flex flex-col items-center justify-center overflow-hidden relative text-white font-bold pt-20">
        {/* Background animated blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-70 animate-blob"></div>

        <header className="z-10 text-center px-4 max-w-xl mx-auto">
          <h1 className="text-6xl md:text-8xl mb-4 animate-pulse tracking-wide drop-shadow-lg">
            VibeVerse
          </h1>
          <p className="text-lg md:text-2xl mb-6 drop-shadow-lg">
            Get your{" "}
            <span className="text-yellow-400 animate-bounce">Vibe Score</span>{" "}
            and compete with the world!
          </p>

          <button
            className="bg-yellow-400 text-indigo-900 cursor-pointer px-8 py-4 rounded-full text-xl font-extrabold uppercase tracking-wider shadow-lg hover:scale-110 hover:shadow-yellow-500/70 transition-transform duration-300 mb-4"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Your Vibe Score
          </button>
        </header>

        <section className="z-10 mt-10 w-full max-w-5xl px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "🤪",
              title: "Meet like minded crazies",
              desc: "Connect with a wild community that vibes just like you.",
            },
            {
              icon: "⚡",
              title: "Instant Score",
              desc: "Get your vibe score in seconds and show off your unique energy.",
            },
            {
              icon: "🏆",
              title: "Global Leaderboard",
              desc: "Compete with people worldwide and claim your place at the top.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-3xl p-8 backdrop-blur-md shadow-lg hover:bg-yellow-400 hover:text-indigo-900 transition-all duration-500 "
            >
              <div className="text-6xl mb-4 animate-bounce">{icon}</div>
              <h3 className="text-2xl mb-2 font-extrabold">{title}</h3>
              <p className="text-sm md:text-base">{desc}</p>
            </div>
          ))}
        </section>

        {/* About Section */}
        <section
          className="z-10 mt-20 w-full max-w-5xl px-8 text-center"
          id="about"
        >
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-md shadow-lg">
            <h2 className="text-4xl mb-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-300">
              About VibeVerse
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left">
                <p className="mb-4">
                  VibeVerse is the ultimate digital playground where your
                  personality becomes your power. Born from the idea that
                  everyone has a unique energy signature, we've created a
                  revolutionary platform that quantifies your vibe and connects
                  you with your tribe.
                </p>
                <p className="mb-4">
                  Our proprietary algorithm analyzes your responses to our
                  carefully crafted questionnaire, translating your essence into
                  a Vibe Score that represents your energy in the digital realm.
                </p>
                <p>
                  Whether you're a chaotic good with off-the-charts creativity
                  or a harmonious soul with chill vibes, VibeVerse celebrates
                  what makes you uniquely you.
                </p>
              </div>

              <div className="text-left">
                <h3 className="text-2xl mb-4 font-bold text-yellow-400">
                  Why VibeVerse?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✦</span>
                    <span>Connect with people who share your wavelength</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✦</span>
                    <span>Discover how your vibe compares globally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✦</span>
                    <span>Track how your energy evolves over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✦</span>
                    <span>Join vibe-specific challenges and events</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300"
                onClick={() => navigate("/login")}
              >
                Start Now!!
              </button>
            </div>
          </div>
        </section>

        <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        <Footer />
      </div>
    </>
  );
}
