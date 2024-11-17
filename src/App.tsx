import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import PatientMonitoring from './components/PatientMonitoring';
import AIInsights from './components/AIInsights';
import PatientsPage from './components/PatientsPage';
import AnalyticsPage from './components/AnalyticsPage';
import TasksPage from './components/TasksPage';
import MessagesPage from './components/MessagesPage';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return (
          <div className="space-y-8">
            <PatientMonitoring />
            <AIInsights />
          </div>
        );
      case 'Patients':
        return <PatientsPage />;
      case 'Monitoring':
        return <PatientMonitoring />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Tasks':
        return <TasksPage />;
      case 'Messages':
        return <MessagesPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;