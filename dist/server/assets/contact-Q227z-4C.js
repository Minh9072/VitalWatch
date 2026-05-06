import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Mail, Phone, MessageSquare, Clock, CheckCircle, Send } from "lucide-react";
const contactMethods = [{
  icon: Mail,
  label: "Email Support",
  value: "truongngocminhvt2004@gmail.com",
  desc: "Response within 24 hours",
  color: "text-purple-400",
  bg: "bg-purple-500/10"
}, {
  icon: Phone,
  label: "Phone",
  value: "+84 356950639",
  desc: "Mon–Fri, 9am – 6pm EST",
  color: "text-blue-400",
  bg: "bg-blue-500/10"
}, {
  icon: MessageSquare,
  label: "Live Chat",
  value: "Chat with an Chatbox",
  desc: "Available during business hours",
  color: "text-emerald-400",
  bg: "bg-emerald-500/10"
}, {
  icon: Clock,
  label: "Emergency Line",
  value: "+84 389072899",
  desc: "24/7 for critical device issues",
  color: "text-red-400",
  bg: "bg-red-500/10"
}];
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6 text-purple-500" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Contact Support" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: "Get help from the VitalWatch team" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: contactMethods.map(({
        icon: Icon,
        label,
        value,
        desc,
        color,
        bg
      }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-start gap-3 hover-scale", children: [
        /* @__PURE__ */ jsx("div", { className: `${bg} p-2.5 rounded-xl flex-shrink-0 mt-0.5`, children: /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 ${color}` }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium", children: label }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white mt-0.5", children: value }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: desc })
        ] })
      ] }, label)) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3 bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover-scale", children: submitted ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full py-12 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "gradient-bg p-4 rounded-2xl mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-2", children: "Message Sent!" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 max-w-xs", children: "Thanks for reaching out. Our support team will get back to you within 24 hours." }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setSubmitted(false);
          setForm({
            name: "",
            email: "",
            subject: "",
            message: ""
          });
        }, className: "mt-6 text-sm text-purple-400 hover:text-purple-300 transition-colors", children: "Send another message" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 dark:text-white mb-5 text-sm", children: "Send a Message" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5", children: "Full Name" }),
              /* @__PURE__ */ jsx("input", { type: "text", required: true, value: form.name, onChange: (e) => setForm((f) => ({
                ...f,
                name: e.target.value
              })), placeholder: "Name", className: "w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5", children: "Email Address" }),
              /* @__PURE__ */ jsx("input", { type: "email", required: true, value: form.email, onChange: (e) => setForm((f) => ({
                ...f,
                email: e.target.value
              })), placeholder: "abc@example.com", className: "w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5", children: "Subject" }),
            /* @__PURE__ */ jsxs("select", { required: true, value: form.subject, onChange: (e) => setForm((f) => ({
              ...f,
              subject: e.target.value
            })), className: "w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select a topic…" }),
              /* @__PURE__ */ jsx("option", { children: "Device connectivity issue" }),
              /* @__PURE__ */ jsx("option", { children: "Heart rate / SpO2 readings" }),
              /* @__PURE__ */ jsx("option", { children: "Fall detection problem" }),
              /* @__PURE__ */ jsx("option", { children: "Account & billing" }),
              /* @__PURE__ */ jsx("option", { children: "Feature request" }),
              /* @__PURE__ */ jsx("option", { children: "Other" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5", children: "Message" }),
            /* @__PURE__ */ jsx("textarea", { required: true, rows: 5, value: form.message, onChange: (e) => setForm((f) => ({
              ...f,
              message: e.target.value
            })), placeholder: "Describe your issue or question in detail…", className: "w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition resize-none" })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "w-full gradient-bg text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity", children: [
            /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
            "Send Message"
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  Contact as component
};
