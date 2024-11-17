import React from 'react';
import { Brain, AlertTriangle } from 'lucide-react';

export default function AIInsights() {
  const insights = [
    {
      type: 'warning',
      message: 'Patient John Doe shows early signs of hypertension based on recent BP readings',
      action: 'Schedule follow-up',
    },
    {
      type: 'prediction',
      message: '85% probability of diabetes management improvement with current treatment plan',
      action: 'View analysis',
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">AI Insights</h2>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full ${insight.type === 'warning' ? 'bg-amber-100' : 'bg-purple-100'}`}>
              {insight.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              ) : (
                <Brain className="w-5 h-5 text-purple-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-800 mb-2">{insight.message}</p>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {insight.action} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}