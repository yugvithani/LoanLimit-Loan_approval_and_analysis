import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FiActivity, FiAlertTriangle, FiCheckCircle, FiDollarSign, 
  FiCreditCard, FiHome, FiUser, FiCalendar 
} from 'react-icons/fi'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'

function AnalysisPage() {
  const [loanAmount, setLoanAmount] = useState(25000)
  const [loanTerm, setLoanTerm] = useState(36)
  const [creditScore, setCreditScore] = useState(720)
  const [income, setIncome] = useState(75000)
  const [employmentYears, setEmploymentYears] = useState(5)
  const [debtToIncome, setDebtToIncome] = useState(30)
  
  // Calculate the risk score based on inputs
  const calculateRiskScore = () => {
    let score = 0
    
    // Credit score impact (0-40 points)
    if (creditScore >= 750) score += 40
    else if (creditScore >= 700) score += 30
    else if (creditScore >= 650) score += 20
    else if (creditScore >= 600) score += 10
    
    // DTI ratio impact (0-30 points)
    if (debtToIncome < 20) score += 30
    else if (debtToIncome < 30) score += 25
    else if (debtToIncome < 40) score += 15
    else if (debtToIncome < 50) score += 5
    
    // Employment history (0-15 points)
    if (employmentYears >= 5) score += 15
    else if (employmentYears >= 2) score += 10
    else if (employmentYears >= 1) score += 5
    
    // Income to loan ratio (0-15 points)
    const incomeToLoanRatio = income / loanAmount
    if (incomeToLoanRatio >= 5) score += 15
    else if (incomeToLoanRatio >= 3) score += 10
    else if (incomeToLoanRatio >= 2) score += 5
    
    return score
  }
  
  const riskScore = calculateRiskScore()
  
  // Determine approval status based on risk score
  const getApprovalStatus = () => {
    if (riskScore >= 80) return { status: 'Approved', color: 'text-success-500', icon: <FiCheckCircle /> }
    if (riskScore >= 60) return { status: 'Conditionally Approved', color: 'text-warning-500', icon: <FiAlertTriangle /> }
    return { status: 'Not Recommended', color: 'text-error-500', icon: <FiAlertTriangle /> }
  }
  
  const approvalStatus = getApprovalStatus()
  
  // Historical risk score data
  const riskTrendData = [
    { month: 'Jan', score: 68 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 65 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 78 },
    { month: 'Jul', score: riskScore },
  ]
  
  // Radar chart data for risk factors
  const riskFactorsData = [
    { subject: 'Credit Score', A: (creditScore >= 750) ? 100 : (creditScore >= 700) ? 75 : (creditScore >= 650) ? 50 : (creditScore >= 600) ? 25 : 10, fullMark: 100 },
    { subject: 'DTI Ratio', A: (debtToIncome < 20) ? 100 : (debtToIncome < 30) ? 80 : (debtToIncome < 40) ? 50 : (debtToIncome < 50) ? 20 : 10, fullMark: 100 },
    { subject: 'Employment', A: (employmentYears >= 5) ? 100 : (employmentYears >= 2) ? 60 : (employmentYears >= 1) ? 30 : 10, fullMark: 100 },
    { subject: 'Income/Loan', A: (income / loanAmount >= 5) ? 100 : (income / loanAmount >= 3) ? 75 : (income / loanAmount >= 2) ? 50 : 25, fullMark: 100 },
    { subject: 'Loan Term', A: (loanTerm <= 24) ? 100 : (loanTerm <= 36) ? 80 : (loanTerm <= 48) ? 60 : (loanTerm <= 60) ? 40 : 20, fullMark: 100 },
  ]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Loan Risk Analysis</h1>
        <p className="text-neutral-400">
          Analyze loan applications and assess risk factors using our advanced AI model
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Input Form */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-6">Loan Application Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Loan Amount (${loanAmount.toLocaleString()})
                </label>
                <div className="flex items-center">
                  <FiDollarSign className="text-neutral-400 mr-2" />
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Loan Term ({loanTerm} months)
                </label>
                <div className="flex items-center">
                  <FiCalendar className="text-neutral-400 mr-2" />
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="12"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Credit Score ({creditScore})
                </label>
                <div className="flex items-center">
                  <FiCreditCard className="text-neutral-400 mr-2" />
                  <input
                    type="range"
                    min="500"
                    max="850"
                    step="10"
                    value={creditScore}
                    onChange={(e) => setCreditScore(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Annual Income (${income.toLocaleString()})
                </label>
                <div className="flex items-center">
                  <FiHome className="text-neutral-400 mr-2" />
                  <input
                    type="range"
                    min="30000"
                    max="200000"
                    step="5000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Years Employed ({employmentYears})
                </label>
                <div className="flex items-center">
                  <FiUser className="text-neutral-400 mr-2" />
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={employmentYears}
                    onChange={(e) => setEmploymentYears(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Debt-to-Income Ratio ({debtToIncome}%)
                </label>
                <div className="flex items-center">
                  <FiActivity className="text-neutral-400 mr-2" />
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={debtToIncome}
                    onChange={(e) => setDebtToIncome(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Column - Analysis Results */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Risk Score Card */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Risk Analysis Result</h2>
                <p className="text-neutral-400 mb-4">
                  Based on the provided application details
                </p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0">
                <div className="flex items-center mr-6">
                  <div className={`text-4xl font-bold ${riskScore >= 80 ? 'text-success-500' : riskScore >= 60 ? 'text-warning-500' : 'text-error-500'}`}>
                    {riskScore}
                  </div>
                  <div className="ml-2">
                    <div className="text-sm text-neutral-400">Risk Score</div>
                    <div className="text-xs text-neutral-500">/100</div>
                  </div>
                </div>
                
                <div>
                  <div className={`flex items-center ${approvalStatus.color}`}>
                    {approvalStatus.icon}
                    <span className="ml-1 font-semibold">{approvalStatus.status}</span>
                  </div>
                  <div className="text-xs text-neutral-500">Approval Status</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-white mb-3">Risk Factors Analysis</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskFactorsData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF' }} />
                    <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={{ fill: '#9CA3AF' }} />
                    <Radar name="Applicant" dataKey="A" stroke="#3A36E0" fill="#3A36E0" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Historical Risk Trend */}
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Historical Risk Score Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3A36E0" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalysisPage