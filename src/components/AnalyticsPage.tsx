import React from 'react';
import { TrendingUp, Users, Calendar, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const metrics = [
    { title: 'Total Patients', value: '1,284', trend: '+12.5%', icon: Users },
    { title: 'Avg. Daily Visits', value: '32.6', trend: '+8.2%', icon: Calendar },
    { title: 'Avg. Wait Time', value: '18min', trend: '-5.1%', icon: Clock },
    { title: 'Patient Satisfaction', value: '94%', trend: '+2.3%', icon: TrendingUp },
  ];

  const demographicsData = [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 25 },
    { name: '35-44', value: 30 },
    { name: '45-54', value: 20 },
    { name: '55+', value: 10 },
  ];

  const treatmentOutcomesData = [
    { name: 'Recovered', value: 65 },
    { name: 'Improving', value: 20 },
    { name: 'Stable', value: 10 },
    { name: 'Critical', value: 5 },
  ];

  const monthlyVisitsData = [
    { month: 'Jan', visits: 450 },
    { month: 'Feb', visits: 480 },
    { month: 'Mar', visits: 520 },
    { month: 'Apr', visits: 490 },
    { month: 'May', visits: 550 },
    { month: 'Jun', visits: 600 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <metric.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm ${
                metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Demographics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demographicsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Patients" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Treatment Outcomes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={treatmentOutcomesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {treatmentOutcomesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Patient Visits</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyVisitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#3b82f6" name="Patient Visits" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}