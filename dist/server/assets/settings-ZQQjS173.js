import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { u as useTheme } from "./router-DKKbV3-8.js";
import { Settings, Moon, Sun, Smartphone, Shield, User, Bell } from "lucide-react";
import "@tanstack/react-router";
import "chart.js";
function Toggle({
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsx("button", { role: "switch", "aria-checked": checked, onClick: onChange, className: ["relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none", checked ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"].join(" "), children: /* @__PURE__ */ jsx("span", { className: ["inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform", checked ? "translate-x-6" : "translate-x-1"].join(" ") }) });
}
function SettingsPage() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx(Settings, { className: "w-6 h-6 text-purple-500" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: "Preferences & configuration" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4 hover-scale", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4", children: "Appearance" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-purple-500/10", children: isDark ? /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4 text-purple-400" }) : /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-yellow-500" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: isDark ? "Dark Mode" : "Light Mode" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: isDark ? "Deep dark theme active" : "Light theme active" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Toggle, { checked: isDark, onChange: toggleTheme })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl p-4 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a14]", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Theme preview" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("div", { onClick: () => {
            if (isDark) toggleTheme();
          }, className: ["flex-1 rounded-lg px-3 py-2 text-xs font-medium text-center cursor-pointer border-2 transition-all", !isDark ? "border-purple-500 bg-white text-gray-800" : "border-gray-200 dark:border-gray-700 bg-white text-gray-600 opacity-50"].join(" "), children: "Light" }),
          /* @__PURE__ */ jsx("div", { onClick: () => {
            if (!isDark) toggleTheme();
          }, className: ["flex-1 rounded-lg px-3 py-2 text-xs font-medium text-center cursor-pointer border-2 transition-all", isDark ? "border-purple-500 bg-[#0f0f1e] text-white" : "border-gray-300 bg-gray-800 text-gray-300 opacity-50"].join(" "), children: "Dark" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4 hover-scale", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4", children: "Notifications" }),
      [{
        label: "Fall Detection Alerts",
        desc: "Notify when a fall is detected",
        default: true
      }, {
        label: "Heart Rate Anomalies",
        desc: "Alert on abnormal heart rate readings",
        default: true
      }, {
        label: "Low SpO2 Warnings",
        desc: "Alert when blood oxygen drops below threshold",
        default: true
      }, {
        label: "Device Disconnected",
        desc: "Notify when wearable loses connection",
        default: false
      }].map((item) => /* @__PURE__ */ jsx(NotificationRow, { label: item.label, desc: item.desc, defaultEnabled: item.default }, item.label))
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-4 hover-scale", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4", children: "Device" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-blue-500/10", children: /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4 text-blue-400" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "VitalBand Pro" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Connected · Firmware v2.4.1" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full font-medium", children: "Online" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover-scale", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4", children: "Privacy & Security" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-green-500/10", children: /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-green-500" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Data Encryption" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "All health data is encrypted at rest and in transit" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-green-400", children: "Active" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-2", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-purple-500/10", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-purple-400" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Emergency Contact" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Jane Doe — +1 (555) 000-0000" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "ml-auto text-xs text-purple-400 hover:text-purple-300 transition-colors", children: "Edit" })
      ] })
    ] })
  ] }) });
}
function NotificationRow({
  label,
  desc,
  defaultEnabled
}) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-gray-100 dark:bg-white/5", children: /* @__PURE__ */ jsx(Bell, { className: "w-3.5 h-3.5 text-gray-400" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: label }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: desc })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Toggle, { checked: enabled, onChange: () => setEnabled((v) => !v) })
  ] });
}
export {
  SettingsPage as component
};
