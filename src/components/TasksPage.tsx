import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Plus, X } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  patient: string;
  priority: string;
  due: string;
  status: string;
  assignedTo?: string;
}

export default function TasksPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review Lab Results',
      patient: 'Sarah Johnson',
      priority: 'High',
      due: '2h',
      status: 'pending',
      assignedTo: 'Dr. Ravi'
    },
    {
      id: 2,
      title: 'Follow-up Call',
      patient: 'Michael Chen',
      priority: 'Medium',
      due: '4h',
      status: 'pending',
      assignedTo: 'Dr. Ravi'
    },
    {
      id: 3,
      title: 'Update Treatment Plan',
      patient: 'Emily Rodriguez',
      priority: 'Low',
      due: 'Tomorrow',
      status: 'completed',
      assignedTo: 'Dr. Wilson'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    patient: '',
    priority: 'Medium',
    due: '',
    assignedTo: 'Dr. Ravi'
  });

  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pending'
    };
    setTasks([...tasks, task]);
    setShowAddForm(false);
    setNewTask({
      title: '',
      patient: '',
      priority: 'Medium',
      due: '',
      assignedTo: 'Dr. Ravi'
    });
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'my':
        return task.assignedTo === 'Dr. Ravi';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 bg-white border hover:bg-gray-50'
          }`}
        >
          All Tasks
        </button>
        <button 
          onClick={() => setFilter('my')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filter === 'my' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 bg-white border hover:bg-gray-50'
          }`}
        >
          My Tasks
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            filter === 'completed' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 bg-white border hover:bg-gray-50'
          }`}
        >
          Completed
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button onClick={() => setShowAddForm(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <input
                  type="text"
                  required
                  value={newTask.patient}
                  onChange={(e) => setNewTask({...newTask, patient: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 2h, Tomorrow, Next Week"
                  value={newTask.due}
                  onChange={(e) => setNewTask({...newTask, due: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Dr. Ravi</option>
                  <option>Dr. Wilson</option>
                  <option>Dr. Chang</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => handleTaskToggle(task.id)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  readOnly={false}
                />
                <div>
                  <h3 className="text-gray-800 font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">Patient: {task.patient}</p>
                  <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{task.due}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}