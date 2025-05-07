import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiUser, FiDollarSign, FiAlertCircle, FiCheckCircle,
  FiClock, FiFilter, FiSearch, FiPlus, FiRefreshCw
} from 'react-icons/fi'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { AuthContext } from '../components/AuthContext'
import { useHttpClient } from '../components/HttpHook'
import { Loader, Loader2 } from 'lucide-react'


function DashboardPage() {
  const [activeTab, setActiveTab] = useState('all')
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState(user.loans)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    age: 30,
    confidenceScore: 85.5,
    creditScore: 750,
    loanAmount: 500000,
    loanId: 1,
    loanIntRate: 10.5,
    loanIntent: "BUSINESS",
    loanNo: 101,
    loanTerm: 24,
    noOfDependants: 2,
    personEmpLength: 120,
    personHomeOwnership: "OWN",
    salary: 150000,
    status: "APPROVED"
  });

  // Get next available loan number
  useEffect(() => {
    if (applications.length > 0) {
      const maxLoanNo = Math.max(...applications.map(app => app.loanNo))
      setFormData(prev => ({
        ...prev,
        loanNo: maxLoanNo + 1
      }))
    }
  }, [applications])

  // Prediction results
  const [predictionResult, setPredictionResult] = useState(null)
  const [showPredictionModal, setShowPredictionModal] = useState(false)

  // Reset form to default values
  const resetForm = () => {
    const maxLoanNo = Math.max(...applications.map(app => app.loanNo))
    setFormData({
      loanNo: maxLoanNo + 1, // Keep incrementing loan number on reset
      salary: 100000,
      personHomeOwnership: "RENT",
      creditScore: 700,
      personEmpLength: 24,
      loanIntRate: 8.0,
      loanAmount: 50000,
      age: 30,
      loanIntent: "PERSONAL",
      loanTerm: 12,
      noOfDependants: 0,
      confidenceScore: 0, // Assuming default value
      status: "REJECTED", // Assuming default status
    });
    setPredictionResult(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Convert numeric values to numbers
    if ([
      'loanNo', 'salary', 'creditScore', 'personEmpLength', 'loanAmount',
      'age', 'loanTerm', 'noOfDependants', 'loanId'
    ].includes(name)) {
      processedValue = parseInt(value, 10);
    } else if (name === 'loanIntRate' || name === 'confidenceScore') {
      processedValue = parseFloat(value);
    }

    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  const simulatePrediction = async () => {
    const apiUrl = "https://hxrh0n2p-5000.inc1.devtunnels.ms/loan-approval-predict";
    const requestData = {
      salary: formData.salary,
      person_home_ownership: formData.personHomeOwnership,
      credit_score: formData.creditScore,
      person_emp_length: formData.personEmpLength,
      loan_int_rate: formData.loanIntRate,
      loan_amount: formData.loanAmount,
      age: formData.age,
      loan_intent: formData.loanIntent,
      loan_term: formData.loanTerm,
      no_of_dependants: formData.noOfDependants
    };

    try {
      const response = await sendRequest(apiUrl, "POST", JSON.stringify(requestData), {
        "Content-Type": "application/json"
      });
      console.log(response);
      return {
        confidence: response.confidence_score.toFixed(2),
        recommendation: response.confidence_score.toFixed(2) > 50 ? 'APPROVED' : 'REJECTED'
      };
    } catch (error) {
      console.error("Error fetching prediction:", error);
      return { confidenceScore: "N/A", recommendation: "ERROR" };
    }
  }


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await simulatePrediction();
    setPredictionResult(result)
    setShowPredictionModal(true)
  }

  const handleLoanDecision = async (decision) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
  
    const newApplication = {
      loanNo: formData.loanNo, // Use the loan number from form
      loanAmount: formData.loanAmount,
      loanIntRate: formData.loanIntRate,
      status: decision,
      creditScore: formData.creditScore,
      confidenceScore: predictionResult.confidence || 0, // Assuming default value
      date: formattedDate,
      loanTerm: formData.loanTerm,
      salary: formData.salary,
      personHomeOwnership: formData.personHomeOwnership,
      personEmpLength: formData.personEmpLength,
      age: formData.age,
      loanIntent: formData.loanIntent,
      noOfDependants: formData.noOfDependants
    };
    console.log(newApplication)
  
    const apiUrl = "http://localhost:8000/loan/create/"+user.managerId;
    const authToken = localStorage.getItem("token"); // Retrieve auth token from local storage
  
    try {
      const response = await sendRequest(apiUrl, "POST", JSON.stringify(newApplication), {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}` // Include auth token in headers
      });
        setApplications([formData, ...applications]); // Update state with response data
        setShowPredictionModal(false);
        resetForm();
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Filter applications based on active tab and search query
  const filteredApplications = applications.filter(app => {
    // First filter by tab (status)
    const statusMatch = activeTab === 'all' ? true : app.status === activeTab

    // Then filter by search query if present
    const searchMatch = searchQuery
      ? app.loanNo.toString().includes(searchQuery)
      : true

    return statusMatch && searchMatch
  })

  // Prediction chart data
  const getPredictionChartData = () => {
    if (!predictionResult) return []

    const approveValue = parseFloat(predictionResult.confidence)
    const rejectValue = 100 - approveValue

    return [
      { name: 'Approve', value: approveValue },
      { name: 'Reject', value: rejectValue }
    ]
  }

  const PREDICTION_COLORS = ['#10B981', '#EF4444']

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'APPROVED': return 'bg-green-500';
      case 'REJECTED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };


  // Clear search query
  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Loan Prediction System</h1>
          <p className="text-gray-400">
            Analyze applications, predict outcomes, and make loan decisions
          </p>
        </div>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Loader2 className="animate-spin text-white w-12 h-12" />
          </div>
        )}
        {/* Loan Application Form */}
        <motion.div
          className="mb-8 bg-gray-800 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">New Loan Application Analysis</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Loan Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Loan Number
              </label>
              <input
                type="number"
                name="loanNo"
                value={formData.loanNo}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Salary (₹)
              </label>
              <input
                type="range"
                name="salary"
                min="100000"
                max="3000000"
                step="10000"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>₹{formData.salary.toLocaleString()}</span>
                <span>Min: ₹1L</span>
                <span>Max: ₹30L</span>
              </div>
            </div>

            {/* Home Ownership */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Home Ownership
              </label>
              <select
                name="personHomeOwnership"
                value={formData.personHomeOwnership}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="RENT">RENT</option>
                <option value="OWN">OWN</option>
                <option value="MORTGAGE">MORTGAGE</option>
              </select>
            </div>

            {/* Credit Score */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Credit Score
              </label>
              <input
                type="range"
                name="creditScore"
                min="300"
                max="900"
                step="1"
                value={formData.creditScore}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formData.creditScore}</span>
                <span>Min: 300</span>
                <span>Max: 900</span>
              </div>
            </div>

            {/* Employment Length */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Employment Length (months)
              </label>
              <input
                type="range"
                name="personEmpLength"
                min="0"
                max="360"
                step="1"
                value={formData.personEmpLength}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formData.personEmpLength} months</span>
                <span>Min: 0</span>
                <span>Max: 360</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="range"
                name="loanIntRate"
                min="8.0"
                max="20.0"
                step="0.1"
                value={formData.loanIntRate}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formData.loanIntRate}%</span>
                <span>Min: 8.0%</span>
                <span>Max: 20.0%</span>
              </div>
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="range"
                name="loanAmount"
                min="50000"
                max="5000000"
                step="10000"
                value={formData.loanAmount}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>₹{formData.loanAmount.toLocaleString()}</span>
                <span>Min: ₹50K</span>
                <span>Max: ₹50L</span>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Age
              </label>
              <input
                type="range"
                name="age"
                min="18"
                max="60"
                step="1"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formData.age} years</span>
                <span>Min: 18</span>
                <span>Max: 60</span>
              </div>
            </div>

            {/* Loan Intent */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Loan Intent
              </label>
              <select
                name="loanIntent"
                value={formData.loanIntent}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="PERSONAL">PERSONAL</option>
                <option value="EDUCATION">EDUCATION</option>
                <option value="MEDICAL">MEDICAL</option>
                <option value="HOME">HOME</option>
                <option value="BUSINESS">BUSINESS</option>
              </select>
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Loan Term (months)
              </label>
              <select
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {Array.from({ length: 20 }, (_, i) => (i + 1) * 12).map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            {/* Dependants */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Number of Dependants
              </label>
              <select
                name="noOfDependants"
                value={formData.noOfDependants}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {Array.from({ length: 8 }, (_, i) => i).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            {/* Form Actions */}
            <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md flex items-center"
              >
                <FiRefreshCw className="mr-2" /> Reset Form
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
              >
                <FiPlus className="mr-2" /> Analyze Application
              </button>
            </div>
          </form>
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
                  placeholder="Search by Loan Number..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 pr-10 rounded-md w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchQuery ? (
                  <button
                    onClick={clearSearch}
                    className="absolute right-10 top-3 text-gray-500 hover:text-gray-300"
                  >
                    ✕
                  </button>
                ) : null}
                <FiSearch className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-4 border-b border-gray-800">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'approved' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('APPROVED')}
            >
              Approved
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'rejected' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('REJECTED')}
            >
              Rejected
            </button>
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className="mb-4 text-gray-400">
              Found {filteredApplications.length} {filteredApplications.length === 1 ? 'result' : 'results'} for Loan Number: {searchQuery}
            </div>
          )}

          {/* No Results Message */}
          {filteredApplications.length === 0 && (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400 mb-4">No loan applications found with the current filters.</p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Applications Table */}
          {filteredApplications.length > 0 && (
            <div className="overflow-x-auto bg-gray-800 rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Loan No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Interest Rate (%)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Loan Term(months)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Credit Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-700/50 transition-colors">
                      {/* Loan Number */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{app.loanNo}</div>
                          </div>
                        </div>
                      </td>

                      {/* Loan Amount */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">₹{app.loanAmount.toLocaleString()}</div>
                      </td>

                      {/* Interest Rate */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{app.loanIntRate}%</div>
                      </td>

                      {/* Loan Term */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{app.loanTerm} months</div>
                      </td>

                      {/* Credit Score */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{app.creditScore}</div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-400">{app.date}</div>
                      </td>

                      {/* Loan Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)} bg-opacity-20 text-white capitalize`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Prediction Result Modal */}
        {showPredictionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-gray-800 rounded-lg p-6 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPredictionModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
                aria-label="Close"
              >
                &times;
              </button>

              <h3 className="text-xl font-bold mb-4">Loan Application Analysis</h3>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 mr-3">Loan Number:</span>
                  <span className="text-white font-medium">{formData.loanNo}</span>
                </div>

                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPredictionChartData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getPredictionChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PREDICTION_COLORS[index % PREDICTION_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-center mt-4">
                  <p className="text-lg">
                    Model Confidence: <span className="font-bold">{predictionResult.confidence}%</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    The model {predictionResult.recommendation === 'approved' ? 'recommends approval' : 'suggests rejection'} based on the application details.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleLoanDecision('REJECTED')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md flex items-center justify-center flex-1 mr-2"
                >
                  <FiAlertCircle className="mr-2" /> Reject Application
                </button>
                <button
                  onClick={() => handleLoanDecision('APPROVED')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center justify-center flex-1 ml-2"
                >
                  <FiCheckCircle className="mr-2" /> Approve Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
