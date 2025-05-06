import { Link } from 'react-router-dom'
import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-neutral-800 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">LoanLimit</h3>
            <p className="text-neutral-400 mb-4">
              Advanced loan approval and risk analysis platform powered by AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-400 hover:text-primary-400 transition">Home</Link></li>
              <li><Link to="/dashboard" className="text-neutral-400 hover:text-primary-400 transition">Dashboard</Link></li>
              <li><Link to="/analysis" className="text-neutral-400 hover:text-primary-400 transition">Analysis</Link></li>
              <li><Link to="/documentation" className="text-neutral-400 hover:text-primary-400 transition">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition">API Documentation</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition">Tutorials</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition">Risk Models</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-primary-400 transition">Compliance Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-neutral-400">support@loanlimit.com</li>
              <li className="text-neutral-400">+1 (888) 555-1234</li>
              <li className="text-neutral-400">123 Financial Street, Suite 100</li>
              <li className="text-neutral-400">New York, NY 10001</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500">© {currentYear} LoanLimit. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-500 hover:text-neutral-300 transition">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-neutral-300 transition">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-neutral-300 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer