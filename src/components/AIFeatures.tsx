import React from 'react';
import { Brain, AlertTriangle, Activity, Stethoscope } from 'lucide-react';

interface AIInsight {
  type: 'diagnostic' | 'predictive' | 'alert';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
}

export default function AIFeatures() {
  const insights: AIInsight[] = [
    {
      type: 'diagnostic',
      title: 'Potential Diagnosis',
      description: 'High probability of Type 2 Diabetes based on recent blood work',
      confidence: 89,
      timestamp: '2 hours ago'
    },
    {
      type: 'predictive',
      title: 'Risk Assessment',
      description: 'Elevated risk of cardiovascular event in next 6 months',
      confidence: 75,
      timestamp: '1 hour ago'
    },
    {
      type: 'alert',
      title: 'Immediate Action Required',
      description: 'Critical blood pressure readings detected',
      confidence: 95,
      timestamp: 'Just now'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">AI Diagnostics</h2>
        </div>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {insight.type === 'diagnostic' && <Stethoscope className="w-5 h-5 text-blue-600" />}
                  {insight.type === 'predictive' && <Activity className="w-5 h-5 text-green-600" />}
                  {insight.type === 'alert' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                  <h3 className="font-medium">{insight.title}</h3>
                </div>
                <span className="text-sm text-gray-500">{insight.timestamp}</span>
              </div>
              <p className="text-gray-700 mb-2">{insight.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${
                      insight.confidence > 80 ? 'bg-green-500' :
                      insight.confidence > 60 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${insight.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{insight.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold">Wellness Score</h2>
        </div>
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                Overall Health Score
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                85%
              </span>
            </div>
          </div>
          <div className="flex h-2 mb-4 overflow-hidden bg-green-200 rounded">
            <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Physical Activity</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Mental Wellness</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: '90%' }}></div>
                </div>
                <span className="text-sm font-medium">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}