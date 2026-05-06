import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Heart, Droplets, Wifi, WifiOff, ShieldAlert, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
import { u as useMqttState, e as ensureMqttConnected, c as clearFallDetection } from "./mqtt-4GEoH63M.js";
const MAX_POINTS = 10;
const labels = Array.from({
  length: MAX_POINTS
}, (_, i) => `${i}s`);
function buildChartData(history, color, fillColor) {
  return {
    labels,
    datasets: [{
      label: "Value",
      data: history,
      borderColor: color,
      backgroundColor: fillColor,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointHitRadius: 10,
      // vẫn hover được tooltip
      borderWidth: 3
      // optional: line đẹp hơn
      // borderJoinStyle: 'round',
      // borderCapStyle: 'round',
    }]
  };
}
const chartOptions = (yLabel, yMin, yMax) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 18,
      bottom: 18,
      left: 10,
      right: 10
    }
  },
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
    x: {
      display: false,
      grid: {
        display: false
      },
      ticks: {
        display: false
        // ẩn giá trị trục X
      }
    },
    y: {
      display: true,
      beginAtZero: yMin === 0,
      min: yMin,
      max: yMax,
      grace: "6%",
      title: {
        display: true,
        text: yLabel,
        color: "#9ca3af"
      },
      grid: {
        display: false
      },
      ticks: {
        color: "#9ca3af",
        callback: (value) => value === -1 ? "" : String(value)
      }
    }
  }
});
function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [fallAlertVisible, setFallAlertVisible] = useState(false);
  const mqttState = useMqttState();
  useEffect(() => {
    setMounted(true);
    ensureMqttConnected().catch((error) => console.error("[MQTT] ensureMqttConnected failed", error));
  }, []);
  const deviceOnline = mqttState.connected;
  const fallDetected = mqttState.fallDetected;
  const hrValue = mqttState.hr ?? 0;
  const spo2Value = mqttState.spo2 ?? 0;
  const fallIncidents = mqttState.fallEvents;
  const vitalHistory = mqttState.vitalHistory;
  useEffect(() => {
    if (fallDetected) {
      setFallAlertVisible(true);
    }
  }, [fallDetected]);
  const handleDismissFallAlert = () => {
    setFallAlertVisible(false);
    clearFallDetection();
  };
  const hrHistory = mqttState.hrHistory.length ? mqttState.hrHistory.slice(-MAX_POINTS) : Array.from({
    length: MAX_POINTS
  }, () => hrValue);
  const spo2History = mqttState.spo2History.length ? mqttState.spo2History.slice(-MAX_POINTS) : Array.from({
    length: MAX_POINTS
  }, () => spo2Value);
  const formatIncidentTime = (time) => {
    const date = new Date(time);
    if (Number.isNaN(date.valueOf())) return time;
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx(Heart, { className: "w-6 h-6 text-pink-500" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Health Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Real-time vitals monitoring" })
      ] })
    ] }),
    fallAlertVisible && /* @__PURE__ */ jsx("div", { className: "mb-5 rounded-2xl border border-red-300/40 bg-red-50/80 p-4 text-sm text-red-900 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Fall detected!" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-700 dark:text-red-100/90", children: "A possible fall has been detected. Dismiss to acknowledge the alert and restore the fall detection status." })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: handleDismissFallAlert, className: "inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700", children: "Dismiss" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-pink-500/10", children: /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4 text-pink-500" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 dark:text-white text-sm", children: "Heart Rate" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-pink-500" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Live" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-gray-900 dark:text-white", children: hrValue }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-400 mb-1", children: "bpm" }),
          /* @__PURE__ */ jsx("span", { className: ["ml-auto text-xs px-2 py-1 rounded-full font-medium", hrValue < 60 ? "text-yellow-400 bg-yellow-400/10" : hrValue > 100 ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"].join(" "), children: hrValue < 60 ? "Low" : hrValue > 100 ? "High" : "Normal" })
        ] }),
        mounted && /* @__PURE__ */ jsx("div", { className: "h-[260px]", children: /* @__PURE__ */ jsx(Line, { data: buildChartData(hrHistory, "rgb(236,72,153)", "rgba(236,72,153,0.1)"), options: chartOptions(" ", -1, 120) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-purple-500/10", children: /* @__PURE__ */ jsx(Droplets, { className: "w-4 h-4 text-purple-500" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 dark:text-white text-sm", children: "SpO2 (Blood Oxygen)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-purple-500" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Live" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-4xl font-extrabold text-gray-900 dark:text-white", children: spo2Value }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-400 mb-1", children: "%" }),
          /* @__PURE__ */ jsx("span", { className: ["ml-auto text-xs px-2 py-1 rounded-full font-medium", spo2Value < 94 ? "text-red-400 bg-red-400/10" : spo2Value < 96 ? "text-yellow-400 bg-yellow-400/10" : "text-green-400 bg-green-400/10"].join(" "), children: spo2Value < 94 ? "Critical" : spo2Value < 96 ? "Low" : "Normal" })
        ] }),
        mounted && /* @__PURE__ */ jsx("div", { className: "h-[260px]", children: /* @__PURE__ */ jsx(Line, { data: buildChartData(spo2History, "rgb(168,85,247)", "rgba(168,85,247,0.1)"), options: chartOptions(" ", -1, 100) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl ${deviceOnline ? "bg-emerald-500/10" : "bg-gray-500/10"}`, children: deviceOnline ? /* @__PURE__ */ jsx(Wifi, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsx(WifiOff, { className: "w-4 h-4 text-gray-400" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 dark:text-white text-sm", children: "Device Connection" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("div", { className: `flex-1 rounded-xl px-4 py-3 ${deviceOnline ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-gray-500/10 border border-gray-600"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            deviceOnline && /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `text-sm font-semibold ${deviceOnline ? "text-emerald-400" : "text-gray-400"}`, children: deviceOnline ? "Wearable Online" : "Wearable Offline" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: deviceOnline ? "VitalBand Pro  connected via Wi-Fi" : "No device detected" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            "Signal: ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300 font-medium", children: "Strong (-62 dBm)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            "Battery: ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300 font-medium", children: "84%" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl ${fallDetected ? "bg-red-500/10" : "bg-green-500/10"}`, children: fallDetected ? /* @__PURE__ */ jsx(ShieldAlert, { className: "w-4 h-4 text-red-500" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-green-500" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 dark:text-white text-sm", children: "Fall Detection" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `rounded-xl px-4 py-3 ${fallDetected ? "bg-red-500/10 border border-red-500/30" : "bg-green-500/10 border border-green-500/20"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            fallDetected && /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 blink" }),
            /* @__PURE__ */ jsx("span", { className: `text-sm font-semibold ${fallDetected ? "text-red-400" : "text-green-400"}`, children: fallDetected ? "FALL DETECTED Alert Active" : "No Fall Detected" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: fallDetected ? "Emergency contacts have been notified" : "Monitoring active user is safe" })
        ] }),
        fallDetected && /* @__PURE__ */ jsx("button", { type: "button", onClick: handleDismissFallAlert, className: "mt-4 inline-flex items-center justify-center rounded-full border border-red-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:bg-[#111118] dark:text-red-300", children: "Dismiss" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-3", children: [
          "Last checked: ",
          /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300", children: "just now" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 dark:text-white text-sm", children: "HR & SpO2 Log" }),
        /* @__PURE__ */ jsxs("span", { className: "ml-auto text-xs text-gray-400", children: [
          vitalHistory.length,
          " records"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-[420px] overflow-y-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800", children: [
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "Timestamp" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "Heart Rate" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "SpO2" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: vitalHistory.map((v) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800/50 last:border-0", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3 text-gray-600 dark:text-gray-300 font-mono text-xs", children: formatIncidentTime(v.time) }),
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxs("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${v.hr < 60 ? "text-yellow-400 bg-yellow-400/10" : v.hr > 100 ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"}`, children: [
            v.hr,
            " bpm"
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxs("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${v.spo2 < 94 ? "text-red-400 bg-red-400/10" : v.spo2 < 96 ? "text-yellow-400 bg-yellow-400/10" : "text-green-400 bg-green-400/10"}`, children: [
            v.spo2,
            "%"
          ] }) })
        ] }, v.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 dark:text-white text-sm", children: "Fall Incident Log" }),
        /* @__PURE__ */ jsxs("span", { className: "ml-auto text-xs text-gray-400", children: [
          fallIncidents.length,
          " recorded events"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-[420px] overflow-y-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800", children: [
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "Timestamp" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "Severity" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 font-medium", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: fallIncidents.map((incident) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800/50 last:border-0", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3 text-gray-600 dark:text-gray-300 font-mono text-xs", children: formatIncidentTime(incident.time) }),
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${incident.severity === "High" ? "text-red-400 bg-red-400/10" : incident.severity === "Medium" ? "text-yellow-400 bg-yellow-400/10" : "text-green-400 bg-green-400/10"}`, children: incident.severity }) }),
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${incident.resolved ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`, children: incident.resolved ? "Resolved" : "Unresolved" }) })
        ] }, incident.id)) })
      ] }) })
    ] })
  ] }) });
}
export {
  Dashboard as component
};
