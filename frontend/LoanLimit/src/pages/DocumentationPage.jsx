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
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-4 pl-10 text-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <FiSearch className="absolute left-3 top-3 text-neutral-500" />
          </div>
          
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
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'guides' ? 'bg-primary-900/30 text-primary-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
                  onClick={() => setActiveTab('guides')}
                >
                  <FiBook className="mr-2" /> Guides
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
              <li className="mb-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'examples' ? 'bg-primary-900/30 text-primary-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
                  onClick={() => setActiveTab('examples')}
                >
                  <FiFileText className="mr-2" /> Examples
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
                        Monitor all loan applications, approval rates, and risk distribution from a central dashboard.
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
                  
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-400 text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Advanced Security</h4>
                      <p className="text-neutral-400">
                        End-to-end encryption and compliance with financial data security standards.
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
                        <li>Credit report retrieval</li>
                        <li>Risk score calculation</li>
                        <li>Decision recommendation</li>
                        <li>Manual review for edge cases</li>
                      </ol>
                    </div>
                  )}
                </div>
                
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <button 
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => toggleExpand('integration')}
                  >
                    <span className="font-medium text-white">Integration Options</span>
                    {expandedItem === 'integration' ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                  
                  {expandedItem === 'integration' && (
                    <div className="mt-2 pl-2 border-l-2 border-primary-600">
                      <p className="text-neutral-400 mb-2">
                        LoanLimit can be integrated with your existing systems through:
                      </p>
                      <ul className="list-disc pl-5 text-neutral-400 space-y-1">
                        <li>REST API</li>
                        <li>Webhook notifications</li>
                        <li>Direct database connections</li>
                        <li>CSV/Excel import/export</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'guides' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">User Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Getting Started</h3>
                  <p className="text-neutral-400 mb-4">Learn the basics of using LoanLimit for loan risk assessment.</p>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Read guide →</a>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Configuring Risk Models</h3>
                  <p className="text-neutral-400 mb-4">Learn how to customize risk assessment models to fit your lending criteria.</p>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Read guide →</a>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">User Management</h3>
                  <p className="text-neutral-400 mb-4">Setting up user roles and permissions for your team.</p>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Read guide →</a>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Reporting & Analytics</h3>
                  <p className="text-neutral-400 mb-4">Generate and interpret loan performance reports.</p>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Read guide →</a>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Security Best Practices</h3>
                  <p className="text-neutral-400 mb-4">Ensuring data security and compliance with regulations.</p>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Read guide →</a>
                </div>
                
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-3">Integration Guide</h3>
                  <p className="text-neutral-400 mb-4">Connecting LoanLimit with your existing systems.</p>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Read guide →</a>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'api' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
                <p className="text-neutral-400 mb-4">
                  All API requests must be authenticated using an API key. You can generate an API key in your account settings.
                </p>
                <div className="bg-neutral-900 p-4 rounded-md mb-4">
                  <code className="text-neutral-300">
                    <pre>{`
curl -X GET https://api.loanlimit.com/v1/applications \
  -H "Authorization: Bearer YOUR_API_KEY"
                    `.trim()}</pre>
                  </code>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Endpoints</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-white mb-2">Applications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-primary-400 mb-1">GET</div>
                      <div className="text-sm text-white mb-1">/applications</div>
                      <div className="text-xs text-neutral-400">List all applications</div>
                    </div>
                    
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                      <div className="text-sm text-white mb-1">/applications</div>
                      <div className="text-xs text-neutral-400">Create a new application</div>
                    </div>
                    
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-primary-400 mb-1">GET</div>
                      <div className="text-sm text-white mb-1">/applications/:id</div>
                      <div className="text-xs text-neutral-400">Get a single application</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-white mb-2">Risk Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                      <div className="text-sm text-white mb-1">/analyze</div>
                      <div className="text-xs text-neutral-400">Analyze application risk</div>
                    </div>
                    
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-primary-400 mb-1">GET</div>
                      <div className="text-sm text-white mb-1">/reports/risk</div>
                      <div className="text-xs text-neutral-400">Generate risk reports</div>
                    </div>
                    
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-warning-500 mb-1">PUT</div>
                      <div className="text-sm text-white mb-1">/models/:id</div>
                      <div className="text-xs text-neutral-400">Update risk model</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-white mb-2">Users & Authentication</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-success-500 mb-1">POST</div>
                      <div className="text-sm text-white mb-1">/auth/login</div>
                      <div className="text-xs text-neutral-400">Authenticate user</div>
                    </div>
                    
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-error-500 mb-1">DELETE</div>
                      <div className="text-sm text-white mb-1">/auth/logout</div>
                      <div className="text-xs text-neutral-400">End user session</div>
                    </div>
                    
                    <div className="bg-neutral-800 p-3 rounded-md">
                      <div className="text-sm font-medium text-primary-400 mb-1">GET</div>
                      <div className="text-sm text-white mb-1">/users/me</div>
                      <div className="text-xs text-neutral-400">Get current user</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'examples' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Example Use Cases</h2>
              
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Mortgage Loan Processing</h3>
                <p className="text-neutral-400 mb-4">
                  Learn how First National Bank reduced mortgage approval time by 60% using LoanLimit.
                </p>
                <a href="#" className="text-primary-400 hover:text-primary-300">View case study →</a>
              </div>
              
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Auto Loan Risk Assessment</h3>
                <p className="text-neutral-400 mb-4">
                  How AutoLend improved accuracy of their risk assessment by 35% and reduced defaults.
                </p>
                <a href="#" className="text-primary-400 hover:text-primary-300">View case study →</a>
              </div>
              
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Small Business Lending</h3>
                <p className="text-neutral-400 mb-4">
                  Streamlining SBA loan processing for Regional Credit Union Network.
                </p>
                <a href="#" className="text-primary-400 hover:text-primary-300">View case study →</a>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-3">Credit Card Application Screening</h3>
                <p className="text-neutral-400 mb-4">
                  How Global Card Services uses LoanLimit to screen thousands of applications daily.
                </p>
                <a href="#" className="text-primary-400 hover:text-primary-300">View case study →</a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DocumentationPage