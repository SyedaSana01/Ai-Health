import React, { useState } from 'react';
import { Heart, Activity, Thermometer, Droplet, Bell, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VitalCard = ({ title, value, unit, icon: Icon, trend, details }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
      <span className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {trend === 'up' ? '+2%' : '-1%'}
      </span>
    </div>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      <span className="text-gray-500">{unit}</span>
    </div>
    <p className="text-sm text-gray-500">{details}</p>
  </div>
);

const AlertBadge = ({ type, children }: { type: string; children: React.ReactNode }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    type === 'critical' ? 'bg-red-100 text-red-800' :
    type === 'warning' ? 'bg-amber-100 text-amber-800' :
    'bg-green-100 text-green-800'
  }`}>
    {children}
  </span>
);

const generateVitalsData = (type: string) => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    let value;
    switch (type) {
      case 'Heart Rate':
        value = Math.floor(Math.random() * (85 - 65) + 65);
        break;
      case 'Blood Pressure':
        const systolic = Math.floor(Math.random() * (130 - 110) + 110);
        const diastolic = Math.floor(Math.random() * (85 - 70) + 70);
        value = { systolic, diastolic };
        break;
      case 'Temperature':
        value = (Math.random() * (99 - 97) + 97).toFixed(1);
        break;
      case 'Blood Glucose':
        value = Math.floor(Math.random() * (140 - 80) + 80);
        break;
      default:
        value = 0;
    }
    data.push({
      time: `${i}:00`,
      value: value,
      ...(type === 'Blood Pressure' && {
        systolic: value.systolic,
        diastolic: value.diastolic
      })
    });
  }
  return data;
};

export default function PatientMonitoring() {
  const [selectedVital, setSelectedVital] = useState('Heart Rate');
  const vitalsData = generateVitalsData(selectedVital);

  const activePatients = [
    {
      name: "Sarah Johnson",
      room: "204",
      status: "critical",
      alert: "High blood pressure",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      name: "Michael Chen",
      room: "156",
      status: "warning",
      alert: "Elevated heart rate",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      name: "Emily Rodriguez",
      room: "302",
      status: "stable",
      alert: "Normal vitals",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ];

  const renderChart = () => {
    if (selectedVital === 'Blood Pressure') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={vitalsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic" />
            <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={vitalsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            name={selectedVital}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Patient Monitoring</h2>
          <p className="text-gray-600">Real-time vital signs and alerts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-600">12 Active Patients</span>
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalCard
          title="Heart Rate"
          value="72"
          unit="bpm"
          icon={Heart}
          trend="down"
          details="Average over last hour"
        />
        <VitalCard
          title="Blood Pressure"
          value="120/80"
          unit="mmHg"
          icon={Activity}
          trend="up"
          details="Systolic/Diastolic"
        />
        <VitalCard
          title="Temperature"
          value="98.6"
          unit="°F"
          icon={Thermometer}
          trend="down"
          details="Oral measurement"
        />
        <VitalCard
          title="Blood Glucose"
          value="95"
          unit="mg/dL"
          icon={Droplet}
          trend="up"
          details="Before meal"
        />
      </div>

      {/* Active Monitoring */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Monitoring</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 text-sm font-medium text-gray-500">Patient</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Room</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Alert</th>
                <th className="pb-3 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activePatients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={patient.img} 
                        alt="" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-4">Room {patient.room}</td>
                  <td className="py-4">
                    <AlertBadge type={patient.status}>{patient.status}</AlertBadge>
                  </td>
                  <td className="py-4 text-gray-600">{patient.alert}</td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vitals Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">24-Hour Vitals Trend</h3>
          <select 
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVital}
            onChange={(e) => setSelectedVital(e.target.value)}
          >
            <option>Heart Rate</option>
            <option>Blood Pressure</option>
            <option>Temperature</option>
            <option>Blood Glucose</option>
          </select>
        </div>
        {renderChart()}
      </div>
    </div>
  );
}