import { useSyncExternalStore } from "react";
const SERVER_URL = "http://localhost:3000";
const MQTT_SCRIPT_URL = "https://cdnjs.cloudflare.com/ajax/libs/mqtt/4.3.7/mqtt.min.js";
let mqttScriptLoader = null;
function ensureMqttScript() {
  if (typeof globalThis.mqtt !== "undefined") {
    return Promise.resolve();
  }
  if (mqttScriptLoader) return mqttScriptLoader;
  mqttScriptLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${MQTT_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => {
        console.info("[MQTT] script already loaded");
        resolve();
      });
      existing.addEventListener("error", (err) => reject(err));
      return;
    }
    const script = document.createElement("script");
    script.src = MQTT_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      console.info("[MQTT] script loaded");
      resolve();
    };
    script.onerror = (event) => reject(new Error(`Failed to load MQTT script: ${event}`));
    document.head.appendChild(script);
  });
  return mqttScriptLoader;
}
const MAX_FALL_EVENTS = 50;
let mqttClient = null;
let mqttInitialized = false;
let mqttState = {
  connected: false,
  hr: null,
  spo2: null,
  fallDetected: false,
  lastUpdate: null,
  hrHistory: [],
  hrLabels: [],
  spo2History: [],
  spo2Labels: [],
  fallEvents: [],
  vitalHistory: []
};
function resolveLatestFallEvent(events) {
  const nextUnresolved = events.find((event) => !event.resolved);
  if (!nextUnresolved) return events;
  return events.map(
    (event) => event.id === nextUnresolved.id ? { ...event, resolved: true } : event
  );
}
const listeners = /* @__PURE__ */ new Set();
const DEFAULT_BROKER = "wss://a07a6fff42de4e72968999f448c09e7c.s1.eu.hivemq.cloud:8884/mqtt";
const DEFAULT_MQTT_CONFIG = {
  brokerUrl: DEFAULT_BROKER,
  username: "hoaidatne",
  password: "Hoaidat2004@",
  reconnectPeriod: 2e3
};
function parseJsonMessage(message) {
  try {
    const raw = typeof message === "string" ? message : message instanceof ArrayBuffer ? new TextDecoder().decode(message) : typeof Buffer !== "undefined" ? Buffer.from(message).toString() : new TextDecoder().decode(message);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function notifyState() {
  listeners.forEach((listener) => listener());
}
function updateState(nextState) {
  mqttState = {
    ...mqttState,
    ...nextState
  };
  notifyState();
}
function clearFallDetection() {
  updateState({
    fallDetected: false,
    fallEvents: resolveLatestFallEvent(mqttState.fallEvents)
  });
}
function pushHistory(history, value) {
  return [...history.slice(-20 + 1), value];
}
function pushLabel(labels, label) {
  return [...labels.slice(-20 + 1), label];
}
function formatLabel(time) {
  const date = new Date(time);
  if (Number.isNaN(date.valueOf())) return time;
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function normalizeFallTime(time) {
  if (!time) return (/* @__PURE__ */ new Date()).toISOString();
  const parsed = new Date(time);
  return Number.isNaN(parsed.valueOf()) ? (/* @__PURE__ */ new Date()).toISOString() : parsed.toISOString();
}
function handleVital(payload) {
  const timestamp = formatLabel(payload.time);
  updateState({
    connected: true,
    hr: payload.hr,
    spo2: payload.spo2,
    lastUpdate: payload.time,
    hrHistory: pushHistory(mqttState.hrHistory, payload.hr),
    hrLabels: pushLabel(mqttState.hrLabels, timestamp),
    spo2History: pushHistory(mqttState.spo2History, payload.spo2),
    spo2Labels: pushLabel(mqttState.spo2Labels, timestamp)
  });
}
function handleFall(payload) {
  if (payload.fall_detected) {
    const event = {
      ...payload,
      id: Date.now(),
      severity: "High",
      time: normalizeFallTime(payload.time),
      resolved: false
    };
    updateState({
      connected: true,
      fallDetected: true,
      lastUpdate: event.time,
      fallEvents: [event, ...mqttState.fallEvents].slice(0, MAX_FALL_EVENTS)
    });
    return;
  }
  updateState({
    connected: true,
    lastUpdate: payload.time
  });
}
function subscribeMqttState(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
function getMqttState() {
  return mqttState;
}
function useMqttState() {
  return useSyncExternalStore(subscribeMqttState, getMqttState, getMqttState);
}
async function connectMqtt(config = {}, handlers = {}) {
  await ensureMqttScript();
  const mqttGlobal = globalThis.mqtt;
  if (!mqttGlobal) {
    throw new Error("Global mqtt object is not available");
  }
  const connectFn = mqttGlobal.connect ?? mqttGlobal;
  if (typeof connectFn !== "function") {
    throw new Error("MQTT connect function not available");
  }
  const url = config.brokerUrl?.trim() || DEFAULT_BROKER;
  if (mqttClient) {
    mqttClient.end(true);
    mqttClient = null;
  }
  const options = {
    reconnectPeriod: config.reconnectPeriod ?? 2e3
  };
  if (config.username) options.username = config.username;
  if (config.password) options.password = config.password;
  mqttClient = connectFn(url, options);
  const client = mqttClient;
  if (!client) throw new Error("Failed to create MQTT client");
  client.on("connect", () => {
    updateState({ connected: true });
    handlers.onConnect?.();
    mqttClient?.subscribe("esp32/vital", (err) => {
      if (err) {
        handlers.onError?.(new Error(`Subscribe esp32/vital failed: ${err.message}`));
      }
    });
    mqttClient?.subscribe("esp32/fall", (err) => {
      if (err) {
        handlers.onError?.(new Error(`Subscribe esp32/fall failed: ${err.message}`));
      }
    });
  });
  client.on("reconnect", () => {
    updateState({ connected: false });
    handlers.onDisconnect?.();
  });
  client.on("close", () => {
    updateState({ connected: false });
    handlers.onDisconnect?.();
  });
  client.on("offline", () => {
    updateState({ connected: false });
    handlers.onDisconnect?.();
  });
  client.on("error", (error) => {
    updateState({ connected: false });
    handlers.onError?.(error instanceof Error ? error : new Error(String(error)));
  });
  client.on("message", (topic, message) => {
    const dataString = typeof message === "string" ? message : message instanceof ArrayBuffer ? new TextDecoder().decode(message) : typeof Buffer !== "undefined" ? Buffer.from(message).toString() : new TextDecoder().decode(message);
    console.debug("[MQTT] message", topic, dataString);
    if (topic === "esp32/vital") {
      const data = parseJsonMessage(message);
      if (data) handlers.onVital?.(data);
      return;
    }
    if (topic === "esp32/fall") {
      const data = parseJsonMessage(message);
      if (data) handlers.onFall?.(data);
    }
  });
  return mqttClient;
}
async function ensureMqttConnected() {
  if (mqttInitialized) return;
  mqttInitialized = true;
  try {
    const falls = await fetch(`${SERVER_URL}/api/fall?only_falls=true&limit=50`).then((r) => r.json());
    const fallEvents = falls.map((f) => ({
      id: f._id,
      fall_detected: f.fall_detected,
      time: f.time,
      severity: "High",
      resolved: false
    }));
    updateState({ fallEvents });
    console.info("[API] Fall history loaded:", fallEvents.length);
  } catch (err) {
    console.error("[API] Failed to load fall history:", err);
  }
  await loadHistory_HR();
  setInterval(loadHistory_HR, 15e3);
  try {
    await connectMqtt(DEFAULT_MQTT_CONFIG, {
      onVital: handleVital,
      onFall: handleFall,
      onConnect: () => {
        console.info("[MQTT] connected");
        updateState({ connected: true });
      },
      onDisconnect: () => {
        console.warn("[MQTT] disconnected");
        updateState({ connected: false });
      },
      onError: (error) => {
        console.error("[MQTT] error", error);
        updateState({ connected: false });
      }
    });
  } catch (error) {
    console.error("[MQTT] connect failed", error);
    updateState({ connected: false });
  }
}
async function loadHistory_HR() {
  try {
    const [vitals] = await Promise.all([
      fetch(`${SERVER_URL}/api/vital?limit=50`).then((r) => r.json())
    ]);
    const vitalHistory = vitals.map((v) => ({
      id: v._id,
      hr: v.hr,
      spo2: v.spo2,
      time: v.time
    }));
    updateState({ vitalHistory });
    console.info("[API] History reloaded");
  } catch (err) {
    console.error("[API] Failed to reload history:", err);
  }
}
export {
  clearFallDetection as c,
  ensureMqttConnected as e,
  useMqttState as u
};
