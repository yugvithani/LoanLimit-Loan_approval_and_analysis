import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiUser, FiDollarSign, FiAlertCircle, FiCheckCircle, 
  FiClock, FiFilter, FiSearch, FiPlus 
} from 'react-icons/fi'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('pending')
  
  // Sample data for loan applications
  const applications = [
    { id: 1, name: 'John Smith', amount: 25000, risk: 'low', status: 'approved', score: 782, date: '2023-12-01' },
    { id: 2, name: 'Alice Johnson', amount: 15000, risk: 'medium', status: 'pending', score: 695, date: '2023-12-02' },
    { id: 3, name: 'Mark Davis', amount: 50000, risk: 'high', status: 'rejected', score: 580, date: '2023-12-03' },
    { id: 4, name: 'Sarah Williams', amount: 10000, risk: 'low', status: 'approved', score: 810, date: '2023-12-04' },
    { id: 5, name: 'Robert Brown', amount: 35000, risk: 'medium', status: 'pending', score: 710, date: '2023-12-05' },
    { id: 6, name: 'Jennifer Lee', amount: 7500, risk: 'low', status: 'pending', score: 745, date: '2023-12-05' },
  ]
  
  // Filtered applications based on active tab
  const filteredApplications = applications.filter(app => 
    activeTab === 'all' ? true : app.status === activeTab
  )
  
  // Chart data
  const riskDistributionData = [
    { name: 'Low Risk', value: 45 },
    { name: 'Medium Risk', value: 35 },
    { name: 'High Risk', value: 20 },
  ]
  
  const approvalTrendData = [
    { name: 'Jan', approved: 65, rejected: 35 },
    { name: 'Feb', approved: 60, rejected: 40 },
    { name: 'Mar', approved: 70, rejected: 30 },
    { name: 'Apr', approved: 55, rejected: 45 },
    { name: 'May', approved: 75, rejected: 25 },
    { name: 'Jun', approved: 80, rejected: 20 },
  ]
  
  const COLORS = ['#10B981', '#F59E0B', '#EF4444']
  
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'low': return 'text-success-500';
      case 'medium': return 'text-warning-500';
      case 'high': return 'text-error-500';
      default: return 'text-neutral-500';
    }
  }
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-success-500';
      case 'pending': return 'bg-warning-500';
      case 'rejected': return 'bg-error-500';
      default: return 'bg-neutral-500';
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Loan Application Dashboard</h1>
        <p className="text-neutral-400">
          Monitor and analyze loan applications, risk assessments, and approval rates
        </p>
      </div>
      
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card bg-primary-900/30">
          <p className="text-neutral-400 text-sm mb-1">Total Applications</p>
          <div className="flex items-center">
            <FiUser className="text-primary-400 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">256</span>
          </div>
        </div>
        
        <div className="card bg-secondary-900/30">
          <p className="text-neutral-400 text-sm mb-1">Total Amount</p>
          <div className="flex items-center">
            <FiDollarSign className="text-secondary-500 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">$2.3M</span>
          </div>
        </div>
        
        <div className="card bg-success-500/20">
          <p className="text-neutral-400 text-sm mb-1">Approval Rate</p>
          <div className="flex items-center">
            <FiCheckCircle className="text-success-500 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">68.5%</span>
          </div>
        </div>
        
        <div className="card bg-error-500/20">
          <p className="text-neutral-400 text-sm mb-1">Average Risk Score</p>
          <div className="flex items-center">
            <FiAlertCircle className="text-error-500 mr-2" size={20} />
            <span className="text-2xl font-bold text-white">42.3</span>
          </div>
        </div>
      </motion.div>
      
      {/* Charts Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Risk Distribution Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Approval Trend Chart */}
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Approval Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={approvalTrendData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="approved" fill="#10B981" name="Approved" />
                <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      
      {/* Recent Applications */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Applications</h3>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-3 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applications..."
                className="bg-neutral-800 border border-neutral-700 text-neutral-200 px-3 py-2 pr-10 rounded-md w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              <FiSearch className="absolute right-3 top-3 text-neutral-500" />
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 p-2 rounded-md">
                <FiFilter />
              </button>
              
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md flex items-center">
                <FiPlus className="mr-1" /> New Application
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-4 border-b border-neutral-800">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'approved' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'rejected' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </button>
        </div>
        
        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-800">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Credit Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-primary-400 font-medium">{app.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{app.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">${app.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRiskColor(app.risk)}`}>
                      {app.risk.charAt(0).toUpperCase() + app.risk.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{app.score}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-400">{app.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)} bg-opacity-20 text-white capitalize`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-400 hover:text-primary-300 mr-3">View</button>
                    <button className="text-primary-400 hover:text-primary-300">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardPage