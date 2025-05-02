"use client"
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function HabitTrackerApp() {
 
  const [view, setView] = useState("home");
  const [goals, setGoals] = useState({ sleep: 8, water: 2, screen: 3 });
  const [logs, setLogs] = useState ({ sleep: 7, water: 1.5, screen: 4 });
  const [streak, setStreak] = useState(5);

  const data= [
    { day: "Mon", sleep: 7, water: 1.5, screen: 3 },
    { day: "Tue", sleep: 8, water: 2, screen: 4 },
    { day: "Wed", sleep: 6.5, water: 1.8, screen: 5 },
    { day: "Thu", sleep: 7.5, water: 2, screen: 2 },
    { day: "Fri", sleep: 8, water: 2.1, screen: 3.5 },
    { day: "Sat", sleep: 7, water: 1.7, screen: 4 },
    { day: "Sun", sleep: 7.5, water: 2, screen: 3 },
  ];

  const handleLogChange = (key:string, value: number) => {
    setLogs({ ...logs, [key]: value });
    setStreak(prev => prev + 1); //  streak logic 
  };

  const tabs = ["Home", "Check-in", "Settings"];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <nav className="bg-blue-500 shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Habit Tracker</h1>
        <div className="space-x-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setView(tab.toLowerCase())}
              className={`px-3 py-1 rounded-md ${
                view === tab.toLowerCase() ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="p-4">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-semibold">This Week's Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['sleep', 'water', 'screen'].map(habit => (
                  <div key={habit} className="bg-white rounded-xl p-4 shadow">
                    <h3 className="text-lg font-semibold capitalize">{habit} (goal: {goals[habit]}{habit === 'water' ? 'L' : 'h'})</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey={habit} stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8 text-lg">🔥 Current Streak: <span className="font-bold">{streak} days</span></div>
            </motion.div>
          )}

          {view === "check-in" && (
            <motion.div
              key="checkin"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Daily Check-in</h2>
              {Object.keys(logs).map(key => (
                <div key={key} className="bg-white rounded-xl p-4 shadow">
                  <label className="block text-sm font-medium capitalize mb-2">{key} ({logs[key]}{key === 'water' ? 'L' : 'h'})</label>
                  <input
                    type="range"
                    min="0"
                    max="{key === 'water' ? 5 : 12}"
                    step="0.1"
                    value={logs[key]}
                    onChange={e => handleLogChange(key, parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              ))}
            </motion.div>
          )}

          {view === "settings" && (
            <motion.div
              key="settings"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Settings</h2>
              {Object.keys(goals).map(key => (
                <div key={key} className="bg-white rounded-xl p-4 shadow">
                  <label className="block text-sm font-medium capitalize mb-2">{key} goal ({goals[key]}{key === 'water' ? 'L' : 'h'})</label>
                  <input
                    type="range"
                    min="0"
                    max="{key === 'water' ? 5 : 12}"
                    step="0.1"
                    value={goals[key]}
                    onChange={e => setGoals({ ...goals, [key]: parseFloat(e.target.value) })}
                    className="w-full accent-green-500"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white text-center py-4 shadow-inner mt-8">
        <p className="text-sm text-gray-500">© 2025 . All rights reserved by Ankit prajapati.</p>
      </footer>
    </div>
  );
}
