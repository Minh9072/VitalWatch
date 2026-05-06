import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Heart, Droplets, Wifi, WifiOff, ShieldAlert, ShieldCheck, AlertTriangle, Clock } from 'lucide-react'
import { ensureMqttConnected, useMqttState, clearFallDetection } from '../mqtt'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Filler)

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

// --- Chart config helpers -----------------------------------------------------
const MAX_POINTS = 10
const labels = Array.from({ length: MAX_POINTS }, (_, i) => `${i}s`)

function buildChartData(history: number[], color: string, fillColor: string) {
  return {
    labels,
    datasets: [
      {
        label: 'Value',
        data: history,
        borderColor: color,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.4,

        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 10, // vẫn hover được tooltip

        borderWidth: 3,

        // optional: line đẹp hơn
        // borderJoinStyle: 'round',
        // borderCapStyle: 'round',
      },
    ],
  }
}

const chartOptions = (yLabel: string, yMin?: number, yMax?: number) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 18,
      bottom: 18,
      left: 10,
      right: 10,
    },
  },

  plugins: {
    legend: { display: false },

    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },

  scales: {
    x: {
      display: false,

      grid: { display: false, },

      ticks: {
        display: false, // ẩn giá trị trục X
      },
    },

    y: {
      display: true,
      beginAtZero: yMin === 0,
      min: yMin,
      max: yMax,
      grace: '6%',

      title: {
        display: true,
        text: yLabel,
        color: '#9ca3af',
      },

      grid: { display: false, },
      ticks: {
        color: '#9ca3af',
        callback: (value: number | string) => (value === -1 ? '' : String(value)),
      },
    },
  },
})

// --- Fall incident log --------------------------------------------------------

const severityColors: Record<string, string> = {
  Low: 'text-yellow-400 bg-yellow-400/10',
  Medium: 'text-orange-400 bg-orange-400/10',
  High: 'text-red-400 bg-red-400/10',
}

// --- Component ----------------------------------------------------------------

function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [fallAlertVisible, setFallAlertVisible] = useState(false)
  const mqttState = useMqttState()

  useEffect(() => {
    setMounted(true)
    ensureMqttConnected().catch(error => console.error('[MQTT] ensureMqttConnected failed', error))
  }, [])

  const deviceOnline = mqttState.connected
  const fallDetected = mqttState.fallDetected
  const hrValue = mqttState.hr ?? 0
  const spo2Value = mqttState.spo2 ?? 0
  const fallIncidents = mqttState.fallEvents
  const vitalHistory = mqttState.vitalHistory







  useEffect(() => {
    if (fallDetected) {
      setFallAlertVisible(true)
    }
  }, [fallDetected])

  const handleDismissFallAlert = () => {
    setFallAlertVisible(false)
    clearFallDetection()
  }

  const hrHistory = mqttState.hrHistory.length
    ? mqttState.hrHistory.slice(-MAX_POINTS)
    : Array.from({ length: MAX_POINTS }, () => hrValue)

  const spo2History = mqttState.spo2History.length
    ? mqttState.spo2History.slice(-MAX_POINTS)
    : Array.from({ length: MAX_POINTS }, () => spo2Value)

  const formatIncidentTime = (time: string) => {
    const date = new Date(time)
    if (Number.isNaN(date.valueOf())) return time
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a14] px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-pink-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time vitals monitoring</p>
          </div>
        </div>

        {fallAlertVisible && (
          <div className="mb-5 rounded-2xl border border-red-300/40 bg-red-50/80 p-4 text-sm text-red-900 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-semibold">Fall detected!</p>
                <p className="mt-1 text-xs text-red-700 dark:text-red-100/90">
                  A possible fall has been detected. Dismiss to acknowledge the alert and restore the fall detection status.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismissFallAlert}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        {/* Top row � vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* Heart Rate */}
          <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-500/10">
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">Heart Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
                </span>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{hrValue}</span>
              <span className="text-gray-400 mb-1">bpm</span>
              <span className={[
                'ml-auto text-xs px-2 py-1 rounded-full font-medium',
                hrValue < 60 ? 'text-yellow-400 bg-yellow-400/10' :
                hrValue > 100 ? 'text-red-400 bg-red-400/10' :
                'text-green-400 bg-green-400/10',
              ].join(' ')}>
                {hrValue < 60 ? 'Low' : hrValue > 100 ? 'High' : 'Normal'}
              </span>
            </div>
            {mounted && (
              <div className="h-[260px]">
                <Line
                  data={buildChartData(hrHistory, 'rgb(236,72,153)', 'rgba(236,72,153,0.1)')}
                  options={chartOptions(' ', -1, 120)}
                />
              </div>
            )}
          </div>

          {/* SpO2 */}
          <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Droplets className="w-4 h-4 text-purple-500" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">SpO2 (Blood Oxygen)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{spo2Value}</span>
              <span className="text-gray-400 mb-1">%</span>
              <span className={[
                'ml-auto text-xs px-2 py-1 rounded-full font-medium',
                spo2Value < 94 ? 'text-red-400 bg-red-400/10' :
                spo2Value < 96 ? 'text-yellow-400 bg-yellow-400/10' :
                'text-green-400 bg-green-400/10',
              ].join(' ')}>
                {spo2Value < 94 ? 'Critical' : spo2Value < 96 ? 'Low' : 'Normal'}
              </span>
            </div>
            {mounted && (
              <div className="h-[260px]">
                <Line
                  data={buildChartData(spo2History, 'rgb(168,85,247)', 'rgba(168,85,247,0.1)')}
                  options={chartOptions(' ', -1, 100)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Second row � status cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

          {/* Device Connection */}
          <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${deviceOnline ? 'bg-emerald-500/10' : 'bg-gray-500/10'}`}>
                {deviceOnline
                  ? <Wifi className="w-4 h-4 text-emerald-500" />
                  : <WifiOff className="w-4 h-4 text-gray-400" />
                }
              </div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Device Connection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex-1 rounded-xl px-4 py-3 ${deviceOnline ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-gray-500/10 border border-gray-600'}`}>
                <div className="flex items-center gap-2">
                  {deviceOnline && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                  <span className={`text-sm font-semibold ${deviceOnline ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {deviceOnline ? 'Wearable Online' : 'Wearable Offline'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {deviceOnline ? 'VitalBand Pro  connected via Wi-Fi' : 'No device detected'}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div>Signal: <span className="text-gray-700 dark:text-gray-300 font-medium">Strong (-62 dBm)</span></div>
              <div>Battery: <span className="text-gray-700 dark:text-gray-300 font-medium">84%</span></div>
            </div>
          </div>

          {/* Fall Detection */}
          <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl ${fallDetected ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                {fallDetected
                  ? <ShieldAlert className="w-4 h-4 text-red-500" />
                  : <ShieldCheck className="w-4 h-4 text-green-500" />
                }
              </div>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Fall Detection</span>
            </div>
            <div className={`rounded-xl px-4 py-3 ${fallDetected ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/20'}`}>
              <div className="flex items-center gap-2">
                {fallDetected && <AlertTriangle className="w-4 h-4 text-red-400 blink" />}
                <span className={`text-sm font-semibold ${fallDetected ? 'text-red-400' : 'text-green-400'}`}>
                  {fallDetected ? 'FALL DETECTED Alert Active' : 'No Fall Detected'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {fallDetected
                  ? 'Emergency contacts have been notified'
                  : 'Monitoring active user is safe'}
              </p>
            </div>
            {fallDetected && (
              <button
                type="button"
                onClick={handleDismissFallAlert}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-red-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:bg-[#111118] dark:text-red-300"
              >
                Dismiss
              </button>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Last checked: <span className="text-gray-700 dark:text-gray-300">just now</span>
            </p>
          </div>
        </div>


        {/* HR & SpO2 Log */}
        <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
              HR & SpO2 Log
            </h2>
            <span className="ml-auto text-xs text-gray-400">
              {vitalHistory.length} records
            </span>
          </div>
          <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-2 font-medium">Timestamp</th>
                  <th className="pb-2 font-medium">Heart Rate</th>
                  <th className="pb-2 font-medium">SpO2</th>
                </tr>
              </thead>

              <tbody>
                {vitalHistory.map((v) => (
                  <tr key={v.id} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                    
                    <td className="py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                      {formatIncidentTime(v.time)}
                    </td>

                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        v.hr < 60 ? 'text-yellow-400 bg-yellow-400/10' :
                        v.hr > 100 ? 'text-red-400 bg-red-400/10' :
                        'text-green-400 bg-green-400/10'
                      }`}>
                        {v.hr} bpm
                      </span>
                    </td>

                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        v.spo2 < 94 ? 'text-red-400 bg-red-400/10' :
                        v.spo2 < 96 ? 'text-yellow-400 bg-yellow-400/10' :
                        'text-green-400 bg-green-400/10'
                      }`}>
                        {v.spo2}%
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Fall Incident Log */}
        <div className="bg-white dark:bg-[#0f0f1e] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover-scale mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
              Fall Incident Log
            </h2>
            <span className="ml-auto text-xs text-gray-400">
              {fallIncidents.length} recorded events
            </span>
          </div>


          <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-2 font-medium">Timestamp</th>
                  <th className="pb-2 font-medium">Severity</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {fallIncidents.map(incident => (
                  <tr key={incident.id} className="border-b border-gray-100 dark:border-gray-800/50 last:border-0">
                    
                    <td className="py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">
                      {formatIncidentTime(incident.time)}
                    </td>

                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        incident.severity === 'High'
                          ? 'text-red-400 bg-red-400/10'
                          : incident.severity === 'Medium'
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-green-400 bg-green-400/10'
                      }`}>
                        {incident.severity}
                      </span>
                    </td>

                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        incident.resolved
                          ? 'text-emerald-400 bg-emerald-400/10'
                          : 'text-red-400 bg-red-400/10'
                      }`}>
                        {incident.resolved ? 'Resolved' : 'Unresolved'}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



      </div>
    </div>
  )
}
