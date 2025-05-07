import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FiActivity, FiAlertTriangle, FiCheckCircle, FiDollarSign, 
  FiCreditCard, FiHome, FiUser, FiCalendar, FiUpload, FiDownload, FiLoader
} from 'react-icons/fi'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

function AnalysisPage() {
  const [transactionFile, setTransactionFile] = useState(null)
  const [formData, setFormData] = useState({
    age: 30,
    income: 500000,
    loanAmount: 1000000,
    creditScore: 750,
    monthsEmployed: 60,
    numCreditLines: 3,
    interestRate: 12,
    loanTerm: 120,
    education: "Bachelor's",
    employmentType: 'Full-time',
    maritalStatus: 'Single',
    hasMortgage: 'no',
    hasDependents: 'no',
    loanPurpose: 'Personal',
    hasCoSigner: 'no'
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // Check if form is valid whenever formData or transactionFile changes
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(value => 
      value !== null && value !== undefined && value !== ''
    )
    
    setIsFormValid(allFieldsFilled && transactionFile !== null)
  }, [formData, transactionFile])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setTransactionFile(file)
    // Here you would handle the file upload and processing
  }

  const downloadSampleFile = () => {
    // Here you would handle the sample file download
  }

  const resetApplication = () => {
    setAnalysisResults(null)
    setTransactionFile(null)
    setFormData({
      age: 30,
      income: 500000,
      loanAmount: 1000000,
      creditScore: 750,
      monthsEmployed: 60,
      numCreditLines: 3,
      interestRate: 12,
      loanTerm: 120,
      education: "Bachelor's",
      employmentType: 'Full-time',
      maritalStatus: 'Single',
      hasMortgage: 'no',
      hasDependents: 'no',
      loanPurpose: 'Personal',
      hasCoSigner: 'no'
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create FormData object
      const apiFormData = new FormData();
      
      apiFormData.append('LoanAmount', formData.loanAmount);
      apiFormData.append('LoanTerm', formData.loanTerm);
      apiFormData.append('CreditScore', formData.creditScore);
      apiFormData.append('Income', formData.income);
      apiFormData.append('Education', formData.education);
      apiFormData.append('EmploymentType', formData.employmentType);
      apiFormData.append('MaritalStatus', formData.maritalStatus);
      apiFormData.append('HasCoSigner', formData.hasCoSigner);
      apiFormData.append('LoanPurpose', formData.loanPurpose);
      apiFormData.append('HasDependents', formData.hasDependents);
      apiFormData.append('HasMortgage', formData.hasMortgage);
      apiFormData.append('Age', formData.age);
      apiFormData.append('NumCreditLines', formData.numCreditLines);
      apiFormData.append('MonthsEmployed', formData.monthsEmployed);
      apiFormData.append('InterestRate', formData.interestRate);
      apiFormData.append('file', transactionFile);
  
      // Make API call
      const response = await fetch('https://hxrh0n2p-5000.inc1.devtunnels.ms/analyze', {
        method: 'POST',
        body: apiFormData,
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      setAnalysisResults(data)
    }
    catch (error) {
      console.error('Error analyzing risk:', error);
      alert(`Error analyzing risk: ${error.message}`);
      setAnalysisResults(null);
    }
    finally {
      setIsLoading(false);
    }
}

  const getRiskLevelColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-white';
    }
  }

  const getRiskLevelDescription = (riskLevel) => {
    switch(riskLevel) {
      case 'Low':
        return 'High probability of timely loan repayment. The applicant demonstrates strong financial stability and creditworthiness.';
      case 'Medium':
        return 'Moderate probability of loan repayment with potential for occasional delays. The applicant shows adequate financial stability with some risk factors.';
      case 'High':
        return 'Lower probability of consistent loan repayment. The applicant has several risk factors that may impact their ability to repay the loan on schedule.';
      default:
        return '';
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Loan Risk Analysis</h1>
        <p className="text-neutral-400">
          Upload transaction history and provide details for comprehensive risk analysis of loan repayment
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* File Upload Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Transaction History</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Upload Recent Yearly Transactions (CSV)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2 hover:bg-neutral-700 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <FiUpload />
                    <span>{transactionFile ? transactionFile.name : 'Choose File'}</span>
                  </div>
                </label>
                <button
                  onClick={downloadSampleFile}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <FiDownload /> Sample File
                </button>
              </div>
              {!transactionFile && (
                <p className="text-xs text-yellow-500 mt-1">
                  Please upload a transaction file to continue
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Loan Application Details</h2>
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Age</label>
              <input
                type="number"
                min="18"
                max="60"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Annual Income</label>
              <input
                type="number"
                min="100000"
                max="3000000"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Loan Amount</label>
              <input
                type="number"
                min="50000"
                max="5000000"
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Credit Score</label>
              <input
                type="number"
                min="300"
                max="900"
                value={formData.creditScore}
                onChange={(e) => setFormData({...formData, creditScore: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Months Employed</label>
              <input
                type="number"
                min="0"
                max="360"
                value={formData.monthsEmployed}
                onChange={(e) => setFormData({...formData, monthsEmployed: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Number of Credit Lines</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.numCreditLines}
                onChange={(e) => setFormData({...formData, numCreditLines: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                min="8.0"
                max="20.0"
                step="0.1"
                value={formData.interestRate}
                onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Loan Term (months)</label>
              <select
                value={formData.loanTerm}
                onChange={(e) => setFormData({...formData, loanTerm: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {Array.from({length: 20}, (_, i) => (i + 1) * 12).map(months => (
                  <option key={months} value={months}>{months} months</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Education</label>
              <select
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {["Bachelor's", "Master's", 'High School', 'PhD'].map(edu => (
                  <option key={edu} value={edu}>{edu}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {['Unemployed', 'Part-time', 'Self-employed', 'Full-time'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Marital Status</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {['Divorced', 'Single', 'Married'].map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Has Mortgage</label>
              <select
                value={formData.hasMortgage}
                onChange={(e) => setFormData({...formData, hasMortgage: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {['yes', 'no'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Has Dependents</label>
              <select
                value={formData.hasDependents}
                onChange={(e) => setFormData({...formData, hasDependents: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {['yes', 'no'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Loan Purpose</label>
              <select
                value={formData.loanPurpose}
                onChange={(e) => setFormData({...formData, loanPurpose: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {['Medical', 'Home', 'Education', 'Business', 'Personal'].map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Has Co-Signer</label>
              <select
                value={formData.hasCoSigner}
                onChange={(e) => setFormData({...formData, hasCoSigner: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white"
                required
              >
                {['yes', 'no'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="col-span-full flex justify-end gap-4">
              {analysisResults && (
                <button type="button" onClick={resetApplication} className="btn btn-secondary">
                  Try Other Application
                </button>
              )}
              <button 
                type="submit" 
                className={`btn ${isFormValid ? 'btn-primary' : 'btn-disabled bg-neutral-600 cursor-not-allowed'}`}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : isFormValid ? 'Analyze Risk' : 'Complete All Fields'}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card flex flex-col items-center justify-center py-16"
          >
            <div className="w-16 h-16 border-4 border-neutral-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-medium text-white mb-2">Analyzing Your Application</h3>
            <p className="text-neutral-400 text-center max-w-md">
              We're processing your loan application and transaction data to provide a comprehensive risk assessment. This may take a moment...
            </p>
          </motion.div>
        )}

        {/* Analysis Results */}
        {!isLoading && analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Risk Score */}
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Risk Analysis</h2>
              <div className="flex items-center justify-between">
                <div className="relative w-48 h-48">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={[
                        { name: 'Risk', value: analysisResults.riskPercentage },
                        { name: 'Safe', value: 100 - analysisResults.riskPercentage }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#EF4444" />
                      <Cell fill="#10B981" />
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{analysisResults.riskPercentage}%</div>
                      <div className="text-sm text-neutral-400">Risk Score</div>
                    </div>
                  </div>
                </div>
                <div className="w-2/3 p-4 bg-neutral-800 rounded-lg">
                  <h3 className={`text-xl font-bold mb-2 ${getRiskLevelColor(analysisResults.riskLevel)}`}>
                    {analysisResults.riskLevel} Risk Level
                  </h3>
                  <p className="text-neutral-300">{getRiskLevelDescription(analysisResults.riskLevel)}</p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-4">
                    <button
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
                      onClick={() => navigate('/approvalstage')}
                    >
                      Proceed Further
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Monthly Summary</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisResults.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year_month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_saved" name="Total Saved" fill="#10B981" />
                    <Bar dataKey="total_spent" name="Total Spent" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Income & Spending Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-4">Income Breakdown</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysisResults.incomeBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {analysisResults.incomeBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-lg text-neutral-300">Average Monthly Income</p>
                  <p className="text-2xl font-bold text-green-500">₹{analysisResults.avgMonthlyIncome.toLocaleString()}</p>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-white mb-4">Spending Breakdown</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analysisResults.spendingBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {analysisResults.spendingBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-lg text-neutral-300">Average Monthly Spending</p>
                  <p className="text-2xl font-bold text-red-500">₹{analysisResults.avgMonthlySpending.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AnalysisPage