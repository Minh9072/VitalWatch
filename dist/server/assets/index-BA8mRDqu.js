import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Heart, Activity, Shield, Wifi, CheckCircle } from "lucide-react";
const features = [{
  icon: Heart,
  title: "Heart Rate Monitoring",
  description: "Continuous real-time pulse tracking with dynamic chart visualizations and instant anomaly alerts.",
  color: "text-pink-500",
  bg: "bg-pink-500/10"
}, {
  icon: Activity,
  title: "SpO2 Blood Oxygen",
  description: "Wave-form blood oxygen saturation charts keeping you informed of your respiratory health.",
  color: "text-purple-500",
  bg: "bg-purple-500/10"
}, {
  icon: Shield,
  title: "Fall Detection",
  description: "AI-powered fall detection with real-time alerts and chronological incident history logging.",
  color: "text-blue-500",
  bg: "bg-blue-500/10"
}, {
  icon: Wifi,
  title: "Device Connectivity",
  description: "Seamless wearable sensor integration with live connection status and automatic reconnection.",
  color: "text-emerald-500",
  bg: "bg-emerald-500/10"
}];
const highlights = ["Real-time health metrics with Chart.js visualizations", "Dark & Light theme with persistent user preferences", "Responsive layout — works on desktop and mobile", "Color-coded alerts: green for safe, red for critical", "Historical reports and fall incident logs"];
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0a14]", children: [
    /* @__PURE__ */ jsxs("section", { className: "px-6 py-16 lg:py-24 max-w-5xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6", children: [
        /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" }),
          /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-purple-500" })
        ] }),
        "Live Health Monitoring Platform"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight", children: [
        "Monitor Your Health",
        " ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "in Real Time" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10", children: "VitalWatch connects to your wearable devices to deliver continuous health insights — heart rate, blood oxygen, fall detection, and more — all in a beautiful, intuitive dashboard." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity", children: [
          "Open Dashboard",
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/reports", className: "inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors", children: "View Reports" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-6 pb-16 max-w-5xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: features.map(({
      icon: Icon,
      title,
      description,
      color,
      bg
    }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-purple-500/40 transition-colors hover-scale", children: [
      /* @__PURE__ */ jsx("div", { className: `${bg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`, children: /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 ${color}` }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 dark:text-white mb-2", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 leading-relaxed", children: description })
    ] }, title)) }) }),
    /* @__PURE__ */ jsx("section", { className: "px-6 pb-20 max-w-5xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover-scale", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-6", children: "Platform Highlights" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: highlights.map((h) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-purple-500 flex-shrink-0" }),
        h
      ] }, h)) })
    ] }) })
  ] });
}
export {
  HomePage as component
};
