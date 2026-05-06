import { createRootRoute, useRouterState, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { Activity, X, Home, LayoutDashboard, FileBarChart2, Settings, Mail, Menu } from "lucide-react";
import { Chart, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend, Filler } from "chart.js";
const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {
  }
});
function useTheme() {
  return useContext(ThemeContext);
}
const Route$5 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VitalWatch – Health Monitoring" }
    ]
  }),
  shellComponent: RootDocument,
  component: RootLayout
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/contact", label: "Contact", icon: Mail }
];
function RootLayout() {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  useEffect(() => {
    const stored = localStorage.getItem("vitalwatch-theme");
    if (stored) setTheme(stored);
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("vitalwatch-theme", next);
      return next;
    });
  };
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: /* @__PURE__ */ jsx("div", { className: isDark ? "dark" : "", children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-gray-50 dark:bg-[#0a0a14] transition-colors duration-300", children: [
    sidebarOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/60 z-20 lg:hidden",
        onClick: () => setSidebarOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: [
          "fixed top-0 left-0 h-full z-30 w-64 flex flex-col",
          "bg-white dark:bg-[#0f0f1e] border-r border-gray-200 dark:border-gray-800",
          "transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:fixed lg:flex"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-800", children: [
            /* @__PURE__ */ jsx("div", { className: "gradient-bg p-2 rounded-xl", children: /* @__PURE__ */ jsx(Activity, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-gray-900 dark:text-white tracking-tight", children: "VitalWatch" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "ml-auto lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white",
                onClick: () => setSidebarOpen(false),
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-4 space-y-1", children: navItems.map(({ to, label, icon: Icon }) => {
            const isActive = to === "/" ? currentPath === "/" : currentPath.startsWith(to);
            return /* @__PURE__ */ jsxs(
              Link,
              {
                to,
                onClick: () => setSidebarOpen(false),
                className: [
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive ? "gradient-bg text-white shadow-lg shadow-purple-500/20" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
                  label
                ]
              },
              to
            );
          }) }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-4 border-t border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/5", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-green-500" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 dark:text-gray-400", children: "System Online" })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0 lg:ml-64", children: [
      /* @__PURE__ */ jsxs("header", { className: "lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#0f0f1e] border-b border-gray-200 dark:border-gray-800", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSidebarOpen(true),
            className: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
            children: /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "gradient-bg p-1.5 rounded-lg", children: /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "VitalWatch" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-auto pt-16 lg:pt-0", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] }) }) });
}
const $$splitComponentImporter$4 = () => import("./settings-ZQQjS173.js");
const Route$4 = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./reports-BbtPnbgI.js");
Chart.register(CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend, Filler);
const Route$3 = createFileRoute("/reports")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard-CB2h-rVp.js");
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Filler);
const Route$2 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./contact-Q227z-4C.js");
const Route$1 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BA8mRDqu.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SettingsRoute = Route$4.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$5
});
const ReportsRoute = Route$3.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$5
});
const DashboardRoute = Route$2.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$5
});
const ContactRoute = Route$1.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$5
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  DashboardRoute,
  ReportsRoute,
  SettingsRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useTheme as u
};
