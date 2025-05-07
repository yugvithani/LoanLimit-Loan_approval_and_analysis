

import { useState } from 'react'
import React from 'react'


import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronRight, FiSearch, FiBook, FiCode, FiFileText, FiInfo } from 'react-icons/fi'


function DocumentationPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedItem, setExpandedItem] = useState('risk-model')


  const toggleExpand = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-neutral-400">
          Comprehensive guides and resources for using the LoanLimit platform
        </p>
      </div>


      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <motion.div
          className="lg:w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <nav>
            <ul>
              <li className="mb-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'overview' ? 'bg-primary-900/30 text-primary-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FiInfo className="mr-2" /> Overview
                </button>
              </li>
              <li className="mb-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'api' ? 'bg-primary-900/30 text-primary-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
                  onClick={() => setActiveTab('api')}
                >
                  <FiCode className="mr-2" /> API Reference
                </button>
              </li>
            </ul>
          </nav>
        </motion.div>


        {/* Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">LoanLimit Platform Overview</h2>


              <div className="prose prose-invert max-w-none">
                <p className="text-neutral-300 mb-4">
                  LoanLimit is an AI-powered loan approval and risk analysis system designed to help financial institutions
                  make faster, more accurate lending decisions. The platform uses advanced machine learning algorithms to analyze
                  loan applications and identify risk patterns.
                </p>


                <h3 className="text-xl font-semibold text-white mt-8 mb-4">Key Features</h3>


                <ul className="space-y-4 mb-8">
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-400 text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">AI-Powered Risk Assessment</h4>
                      <p className="text-neutral-400">
                        Uses machine learning to analyze loan application data and predict risk with high accuracy.
                      </p>
                    </div>
                  </li>


                  <li className="flex">
                    <div className="mr-4 flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-400 text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Comprehensive Dashboard</h4>
                      <p className="text-neutral-400">
                        Monitor all loan applications, Analyze applications, predict outcomes, and make loan decisions from a central dashboard.
                      </p>
                    </div>
                  </li>


                  <li className="flex">
                    <div className="mr-4 flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-400 text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Real-time Analysis</h4>
                      <p className="text-neutral-400">
                        Process loan applications in real-time, providing instant feedback on approval likelihood.
                      </p>
                    </div>
                  </li>
                </ul>


                <h3 className="text-xl font-semibold text-white mt-8 mb-4">How It Works</h3>


                <div className="bg-neutral-800/50 rounded-lg p-4 mb-8">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => toggleExpand('risk-model')}
                  >
                    <span className="font-medium text-white">Risk Assessment Model</span>
                    {expandedItem === 'risk-model' ? <FiChevronDown /> : <FiChevronRight />}
                  </button>


                  {expandedItem === 'risk-model' && (
                    <div className="mt-2 pl-2 border-l-2 border-primary-600">
                      <p className="text-neutral-400 mb-2">
                        Our risk assessment model uses a combination of traditional credit scoring and machine learning
                        to predict loan default probability. Key factors analyzed include:
                      </p>
                      <ul className="list-disc pl-5 text-neutral-400 space-y-1">
                        <li>Credit history and score</li>
                        <li>Income to debt ratio</li>
                        <li>Employment stability</li>
                        <li>Loan purpose and amount</li>
                        <li>Historical repayment behavior</li>
                      </ul>
                    </div>
                  )}
                </div>


                <div className="bg-neutral-800/50 rounded-lg p-4 mb-8">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => toggleExpand('application-process')}
                  >
                    <span className="font-medium text-white">Application Processing</span>
                    {expandedItem === 'application-process' ? <FiChevronDown /> : <FiChevronRight />}
                  </button>


                  {expandedItem === 'application-process' && (
                    <div className="mt-2 pl-2 border-l-2 border-primary-600">
                      <p className="text-neutral-400">
                        When a loan application is submitted, it goes through the following process:
                      </p>
                      <ol className="list-decimal pl-5 text-neutral-400 space-y-1 mt-2">
                        <li>Data validation and cleaning</li>
                        <li>Model Execution</li>
                        <li>Confidence score calculation</li>
                        <li>Decision recommendation</li>
                        <li>Manual Loan Approval or Rejection</li>
                      </ol>
                    </div>
                  )}
                </div>


                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => toggleExpand('integration')}
                  >
                    <span className="font-medium text-white">Implementation Details</span>
                    {expandedItem === 'integration' ? <FiChevronDown /> : <FiChevronRight />}
                  </button>


                  {expandedItem === 'integration' && (
                    <div className="mt-2 pl-2 border-l-2 border-primary-600">
                      <p className="text-neutral-400 mb-2">
                      LoanLimit implemented using multiple servers :
                      </p>
                      <ul className="list-disc pl-5 text-neutral-400 space-y-1">
                        <li>Frontend Using ReactJs</li>
                      </ul>
                      <ul className="list-disc pl-5 text-neutral-400 space-y-1">
                        <li>API Developement in SpringBoot</li>
                      </ul>
                      <ul className="list-disc pl-5 text-neutral-400 space-y-1">
                        <li>Model Developement in FlaskAPI</li>
                      </ul>
                      <p className="text-neutral-400 mb-2">
                        All servers are interconnected using RestApi
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}


          {activeTab === 'api' && (
            <div>
            <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
         
            {/* Authentication Section */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
              <p className="text-neutral-400 mb-4">
                All API requests must be authenticated using an API key or login credentials.
              </p>
         
              {/* Admin Login */}
              <div className="bg-neutral-900 p-4 rounded-md mb-4">
                <code className="text-neutral-300">
                  <pre>{`
          curl -X POST http://api.loanlimit.com/auth/manager \
            -H "Content-Type: application/json" \
            -d '{
              "username": "branch-city@manager",
              "password": "******"
            }'
                  `.trim()}</pre>
                </code>
              </div>
            </div>
         
                        {/* Model-Based Predictions */}
                        <div className="card mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Model-Based Predictions</h3>
         
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/analyze</div>
                  <div className="text-xs text-neutral-400">Risk analysis based on transaction history</div>
                </div>
         
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/loan-approval-predict</div>
                  <div className="text-xs text-neutral-400">Predict credit score from applicant details</div>
                </div>
              </div>
            </div>
           
            {/* Manager Authentication */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Manager Authentication</h3>
         
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/auth/manager</div>
                  <div className="text-xs text-neutral-400">Authenticate manager</div>
                </div>
         
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-warning-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/auth/manager-verify/{'{userName}'}</div>
                  <div className="text-xs text-neutral-400">Verify and update manager password</div>
                </div>
              </div>
            </div>
         
            {/* Admin Management */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Admin Management</h3>
         
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/admin/create-manager</div>
                  <div className="text-xs text-neutral-400">Create a new manager</div>
                </div>
         
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-warning-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/admin/change-manager</div>
                  <div className="text-xs text-neutral-400">Update manager details</div>
                </div>
         
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-primary-400 mb-1">GET</div>
                  <div className="text-sm text-white mb-1">/admin/get-manager</div>
                  <div className="text-xs text-neutral-400">Retrieve all managers</div>
                </div>
         
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-error-500 mb-1">DELETE</div>
                  <div className="text-sm text-white mb-1">/admin/delete-manager/{'{userName}'}</div>
                  <div className="text-xs text-neutral-400">Delete a manager</div>
                </div>
              </div>
            </div>
         
            {/* Loan Management */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Loan Management</h3>
         
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                  <div className="text-sm text-white mb-1">/loan/create/{'{managerId}'}</div>
                  <div className="text-xs text-neutral-400">Create a new loan application</div>
                </div>
         
                <div className="bg-neutral-800 p-3 rounded-md">
                  <div className="text-sm font-medium text-primary-400 mb-1">GET</div>
                  <div className="text-sm text-white mb-1">/loan/manager/{'{managerId}'}</div>
                  <div className="text-xs text-neutral-400">Retrieve all loans for a manager</div>
                </div>
              </div>
            </div>
          </div>
         
          )}
        </motion.div>
      </div>
    </div>
  )
}


export default DocumentationPage