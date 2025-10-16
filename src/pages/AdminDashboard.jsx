import { useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import useAdminStore from "../store/adminStore";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b", "#00bcd4"];

// --- StatCard Component ---
const StatCard = ({ title, value, color }) => (
  <div className="p-6 rounded-2xl bg-gray-900/70 border border-gray-700 shadow-lg flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn">
    <p className="text-gray-400">{title}</p>
    <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
  </div>
);

const AdminDashboard = () => {
  const {
    stats, assessments, chatStats,
    getStats, getAssessments, getChatStats, loading
  } = useAdminStore();

  useEffect(() => {
    getStats();
    getAssessments();
    getChatStats();
  }, [ getStats, getAssessments, getChatStats ]);

  const getAssessmentChartData = (testName) => {
    const counts = {};
    assessments.forEach(a => {
      if (a[testName]) {
        counts[a[testName].result] = (counts[a[testName].result] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  if (loading) return <p className="text-white text-center mt-12">Loading dashboard...</p>;

  return (
    <div className=" w-[90vw] p-6 space-y-12 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 animate-fadeIn">Admin Dashboard</h1>

      {/* --- Summary Cards --- */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 mx-auto gap-6">
        <StatCard title="Users" value={stats.users} color="text-indigo-400" />
        <StatCard title="Bookings" value={stats.bookings} color="text-teal-400" />
        <StatCard title="Assessments" value={stats.assessments} color="text-purple-400" />
        <StatCard title="Chats" value={stats.chats} color="text-pink-400" />
      </div>

      {/* --- Assessment Pie Charts --- */}
      <div className="grid md:grid-cols-3 gap-8">
        {["phq9", "gad7", "ghq"].map((test, idx) => {
          const data = getAssessmentChartData(test);
          return (
            <div key={idx} className="p-6 bg-gray-900/70 border border-gray-700 rounded-2xl shadow-lg animate-fadeIn">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4">{test.toUpperCase()} Results</h3>
              {data.length ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                      isAnimationActive={true}
                    >
                      {data.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-400">No data available</p>}
            </div>
          )
        })}
      </div>

      {/* --- Chat Activity Bar Chart --- */}
      <div className="p-6 bg-gray-900/70 border border-gray-700 rounded-2xl shadow-lg animate-fadeIn">
        <h3 className="text-xl font-semibold text-indigo-400 mb-4">Chat Activity</h3>
        {chatStats.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chatStats}
              barCategoryGap="20%"
              maxBarSize={50}
            >
              <XAxis dataKey="aliasId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="userMessages" fill="#82ca9d" animationDuration={1000} />
              <Bar dataKey="botMessages" fill="#8884d8" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-400">No chat data available</p>}
      </div>

      {/* --- Recent Assessments Table --- */}
      <div className="p-6 bg-gray-900/70 border border-gray-700 rounded-2xl shadow-lg overflow-x-auto animate-fadeIn">
        <h3 className="text-xl font-semibold text-indigo-400 mb-4">Recent Assessments</h3>
        {assessments.length ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">PHQ-9</th>
                <th className="px-4 py-2">GAD-7</th>
                <th className="px-4 py-2">GHQ-12</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{a.aliasId}</td>
                  <td className="px-4 py-2">{a.phq9?.total ?? "-"} ({a.phq9?.result ?? "-"})</td>
                  <td className="px-4 py-2">{a.gad7?.total ?? "-"} ({a.gad7?.result ?? "-"})</td>
                  <td className="px-4 py-2">{a.ghq?.total ?? "-"} ({a.ghq?.result ?? "-"})</td>
                  <td className="px-4 py-2">{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="text-gray-400">No assessments found</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
