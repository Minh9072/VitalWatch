import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FileBarChart2, Heart, Droplets, TrendingUp } from "lucide-react";
import { u as useMqttState, e as ensureMqttConnected } from "./mqtt-4GEoH63M.js";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function average(values, fallback) {
  if (!values.length) return fallback;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
function ensureLength(values, length, fallback) {
  if (values.length >= length) return values.slice(-length);
  return [...Array(length - values.length).fill(fallback), ...values];
}
function buildWeeklyChart(history, fallback) {
  return {
    labels: days,
    datasets: [{
      label: "Avg",
      data: ensureLength(history, days.length, fallback),
      borderColor: fallback === 0 ? "rgb(107,114,128)" : "rgb(236,72,153)",
      backgroundColor: fallback === 0 ? "rgba(107,114,128,0.1)" : "rgba(236,72,153,0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: fallback === 0 ? "rgb(107,114,128)" : "rgb(236,72,153)",
      pointRadius: 4
    }]
  };
}
function buildWeeklySpO2Chart(history, fallback) {
  return {
    labels: days,
    datasets: [{
      label: "Avg SpO2 %",
      data: ensureLength(history, days.length, fallback),
      borderColor: "rgb(168,85,247)",
      backgroundColor: "rgba(168,85,247,0.1)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "rgb(168,85,247)",
      pointRadius: 4
    }]
  };
}
function buildFallCounts(events) {
  const counts = [0, 0, 0, 0];
  const now = Date.now();
  const MS_PER_DAY = 864e5;
  events.forEach((event) => {
    const date = new Date(event.time);
    if (Number.isNaN(date.valueOf())) return;
    const diffDays = Math.floor((now - date.getTime()) / MS_PER_DAY);
    const weekIndex = Math.floor(diffDays / 7);
    if (weekIndex >= 0 && weekIndex < 4) {
      counts[3 - weekIndex] += 1;
    }
  });
  return counts;
}
const chartOpts = (yLabel) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: "index",
      intersect: false
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: yLabel,
        color: "#9ca3af"
      },
      grid: {
        color: "rgba(255,255,255,0.05)"
      },
      ticks: {
        color: "#9ca3af"
      }
    },
    x: {
      grid: {
        color: "rgba(255,255,255,0.05)"
      },
      ticks: {
        color: "#9ca3af"
      }
    }
  }
});
function Reports() {
  const [mounted, setMounted] = useState(false);
  const mqttState = useMqttState();
  useEffect(() => {
    setMounted(true);
    ensureMqttConnected();
  }, []);
  const averageHr = average(mqttState.hrHistory, mqttState.hr ?? 0);
  const averageSpo2 = average(mqttState.spo2History, mqttState.spo2 ?? 0);
  const fallCount = mqttState.fallEvents.length;
  const summaryStats = [{
    label: "Avg Heart Rate",
    value: `${averageHr} bpm`,
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  }, {
    label: "Avg SpO2",
    value: `${averageSpo2}%`,
    icon: Droplets,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }, {
    label: "Fall Events (month)",
    value: `${fallCount}`,
    icon: TrendingUp,
    color: "text-red-500",
    bg: "bg-red-500/10"
  }];
  const hrWeekly = buildWeeklyChart(mqttState.hrHistory, mqttState.hr ?? 0);
  const spo2Weekly = buildWeeklySpO2Chart(mqttState.spo2History, mqttState.spo2 ?? 0);
  const fallsMonthly = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      label: "Fall Events",
      data: buildFallCounts(mqttState.fallEvents),
      backgroundColor: "rgba(239,68,68,0.7)",
      borderRadius: 6
    }]
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx(FileBarChart2, { className: "w-6 h-6 text-purple-500" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Reports" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: "Historical health data analysis" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: summaryStats.map(({
      label,
      value,
      icon: Icon,
      color,
      bg
    }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-center gap-4 hover-scale", children: [
      /* @__PURE__ */ jsx("div", { className: `${bg} p-3 rounded-xl`, children: /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 ${color}` }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: label }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900 dark:text-white", children: value })
      ] })
    ] }, label)) }),
    mounted && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 dark:text-white mb-1 text-sm", children: "Heart Rate — Weekly Average" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-4", children: "Beats per minute by day" }),
        /* @__PURE__ */ jsx(Line, { data: hrWeekly, options: chartOpts("BPM") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 dark:text-white mb-1 text-sm", children: "SpO2 — Weekly Average" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-4", children: "Blood oxygen saturation by day" }),
        /* @__PURE__ */ jsx(Line, { data: spo2Weekly, options: chartOpts("%") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 lg:col-span-2 hover-scale", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 dark:text-white mb-1 text-sm", children: "Fall Events — Monthly Breakdown" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-4", children: "Number of detected fall incidents per week" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-lg", children: /* @__PURE__ */ jsx(Bar, { data: fallsMonthly, options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(255,255,255,0.05)"
              },
              ticks: {
                color: "#9ca3af",
                stepSize: 1
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: "#9ca3af"
              }
            }
          }
        } }) })
      ] })
    ] })
  ] }) });
}
export {
  Reports as component
};
