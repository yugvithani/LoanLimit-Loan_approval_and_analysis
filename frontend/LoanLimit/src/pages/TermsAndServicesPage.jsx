import React, { useState } from 'react'
import { FiCheckCircle, FiAlertTriangle, FiFileText, FiShield, FiKey } from 'react-icons/fi'

function TermsAndServicesPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  
  const handleAcceptTerms = () => {
    setAcceptedTerms(true)
    // In a real app, you would store this acceptance in a database or localStorage
    setTimeout(() => {
      window.location.href = '/analysis' // Redirect to analysis page after acceptance
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-neutral-400">
          Please review and accept our terms and conditions before proceeding with loan risk analysis
        </p>
      </div>

      <div className="card mb-8">
        <div className="flex items-center mb-4">
          <FiFileText className="text-blue-500 text-xl mr-2" />
          <h2 className="text-xl font-semibold text-white">Terms & Conditions</h2>
        </div>

        <div className="bg-neutral-800 p-4 rounded-md mb-6 max-h-96 overflow-y-auto">
          <div className="prose prose-invert prose-sm max-w-none">
            <h3 className="text-lg font-semibold text-white">1. Introduction</h3>
            <p>
              Welcome to Loan Risk Analysis Services ("the Service"). These Terms of Service ("Terms") govern your use of our loan risk analysis platform, operated by Finance Analytics Corp. By accessing or using our Service, you agree to be bound by these Terms.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">2. Service Description</h3>
            <p>
              The Service provides loan risk analysis based on financial data submitted by users. Our analysis tools process transaction history and financial information to generate risk assessments, spending patterns, and financial recommendations.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">3. User Accounts</h3>
            <p>
              To use our Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">4. Data Collection and Privacy</h3>
            <p>
              Our Service requires financial and personal data to function properly. By using our Service, you consent to our collection and processing of your data as described in our Privacy Policy. We implement appropriate security measures to protect your data but cannot guarantee absolute security.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">5. Data Usage</h3>
            <p>
              The financial data you upload will be used solely for the purpose of providing risk analysis and financial insights. We may use anonymized, aggregated data for improving our algorithms and services. We will never sell your personal data to third parties without your explicit consent.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">6. Disclaimers</h3>
            <p>
              The risk analysis provided by our Service is based on algorithmic calculations and historical data patterns. It is provided for informational purposes only and should not be considered as financial advice. We do not guarantee the accuracy of our risk assessments or predictions.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">7. Liability Limitations</h3>
            <p>
              Finance Analytics Corp shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of the Service or any financial decisions made based on our analysis. This includes but is not limited to loan approvals, rejections, or terms offered by lending institutions.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">8. Service Availability</h3>
            <p>
              We strive to maintain uninterrupted service, but we do not guarantee that the Service will be available at all times. We reserve the right to suspend or terminate access to the Service for maintenance, updates, or other operational reasons without prior notice.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">9. Intellectual Property</h3>
            <p>
              All content, features, and functionality of our Service, including but not limited to text, graphics, algorithms, logos, and software, are owned by Finance Analytics Corp and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">10. Modifications to Terms</h3>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website or through direct communication. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">11. Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, India.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">12. Termination</h3>
            <p>
              We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, our business, or third parties, or for any other reason.
            </p>

            <h3 className="text-lg font-semibold text-white mt-4">13. Contact Information</h3>
            <p>
              If you have any questions about these Terms, please contact us at legal@finance-analytics-corp.com or through our contact form available on our website.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-800 p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 pt-0.5">
                <FiShield className="text-blue-500 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-medium">Data Protection Commitment</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  We employ industry-standard security measures to protect your financial data. All information is encrypted both in transit and at rest using AES-256 encryption. We maintain strict access controls and regular security audits.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 pt-0.5">
                <FiKey className="text-blue-500 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-medium">Financial Data Usage</h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Your uploaded transaction history and financial details are used exclusively for risk assessment purposes. We do not share your individual data with third parties, including lending institutions, without your explicit permission.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          {acceptedTerms ? (
            <div className="flex items-center justify-center text-green-500 gap-2">
              <FiCheckCircle className="text-xl" />
              <span>Terms accepted! Redirecting to analysis...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="accept-terms"
                  className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4 bg-neutral-800 border-neutral-600"
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="accept-terms" className="ml-2 text-neutral-300">
                  I have read and agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              
              <button
                className={`btn ${
                  acceptedTerms ? 'btn-primary' : 'btn-disabled bg-neutral-600 cursor-not-allowed'
                }`}
                disabled={!acceptedTerms}
                onClick={handleAcceptTerms}
              >
                Accept & Continue
              </button>
              
              <div className="text-xs text-neutral-500 mt-4 text-center max-w-md">
                By clicking "Accept & Continue," you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center mb-4">
          <FiAlertTriangle className="text-yellow-500 text-xl mr-2" />
          <h2 className="text-xl font-semibold text-white">Important Disclaimer</h2>
        </div>
        
        <p className="text-neutral-300">
          The risk analysis provided by our service is for informational purposes only and does not constitute financial advice. Our assessments are based on algorithmic analysis of historical data and user-provided information, which may have limitations. Lending institutions make final loan approval decisions based on their own criteria, which may differ from our analysis.
        </p>
        
        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-md p-4 mt-4">
          <p className="text-yellow-400 text-sm">
            Always consult with a qualified financial advisor before making significant financial decisions. Past performance and risk assessments are not guarantees of future results or loan approvals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsAndServicesPage