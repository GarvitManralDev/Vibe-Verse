// categoryColors.js
// A centralized color system for all category types

export const categoryColors = {
  // Regular categories
  music: {
    gradient: "from-purple-600 to-indigo-700",
    textColor: "text-purple-200",
    borderColor: "border-purple-500",
    iconBg: "bg-purple-600",
  },
  sports: {
    gradient: "from-green-600 to-emerald-700",
    textColor: "text-green-200",
    borderColor: "border-green-500",
    iconBg: "bg-green-600",
  },
  weekend: {
    gradient: "from-orange-500 to-amber-700",
    textColor: "text-amber-200",
    borderColor: "border-orange-500",
    iconBg: "bg-orange-600",
  },
  movies: {
    gradient: "from-red-600 to-rose-700",
    textColor: "text-red-200",
    borderColor: "border-red-500",
    iconBg: "bg-red-600",
  },
  food: {
    gradient: "from-yellow-500 to-amber-600",
    textColor: "text-yellow-200",
    borderColor: "border-yellow-500",
    iconBg: "bg-yellow-500",
  },
  travel: {
    gradient: "from-sky-500 to-blue-700",
    textColor: "text-sky-200",
    borderColor: "border-sky-500",
    iconBg: "bg-sky-600",
  },
  tech: {
    gradient: "from-cyan-600 to-teal-700",
    textColor: "text-cyan-200",
    borderColor: "border-cyan-500",
    iconBg: "bg-cyan-600",
  },
  popculture: {
    gradient: "from-pink-500 to-fuchsia-700",
    textColor: "text-pink-200",
    borderColor: "border-pink-500",
    iconBg: "bg-pink-600",
  },
  brainteasers: {
    gradient: "from-violet-600 to-purple-800",
    textColor: "text-violet-200",
    borderColor: "border-violet-500",
    iconBg: "bg-violet-600",
  },
  history: {
    gradient: "from-amber-700 to-yellow-900",
    textColor: "text-amber-200",
    borderColor: "border-amber-600",
    iconBg: "bg-amber-700",
  },

  // Edgy categories
  sheets: {
    gradient: "from-rose-600 to-pink-800",
    textColor: "text-rose-200",
    borderColor: "border-rose-500",
    iconBg: "bg-rose-600",
  },
  secrets: {
    gradient: "from-purple-700 to-indigo-900",
    textColor: "text-purple-200",
    borderColor: "border-purple-600",
    iconBg: "bg-purple-700",
  },
  confessions: {
    gradient: "from-blue-700 to-violet-900",
    textColor: "text-blue-200",
    borderColor: "border-blue-600",
    iconBg: "bg-blue-700",
  },
  innuendo: {
    gradient: "from-fuchsia-700 to-pink-900",
    textColor: "text-fuchsia-200",
    borderColor: "border-fuchsia-600",
    iconBg: "bg-fuchsia-700",
  },
  truth: {
    gradient: "from-red-800 to-rose-900",
    textColor: "text-red-200",
    borderColor: "border-red-700",
    iconBg: "bg-red-800",
  },
};

// For tab-level styling
export const tabColors = {
  regular: {
    active: "from-blue-600 to-cyan-600",
    hover: "hover:text-blue-200",
  },
  edgy: {
    active: "from-rose-600 to-red-600",
    hover: "hover:text-rose-200",
  },
};

// Helper function to get category colors
export const getCategoryColors = (categoryId) => {
  return (
    categoryColors[categoryId] || {
      gradient: "from-gray-600 to-slate-700", // fallback
      textColor: "text-gray-200",
      borderColor: "border-gray-500",
      iconBg: "bg-gray-600",
    }
  );
};
