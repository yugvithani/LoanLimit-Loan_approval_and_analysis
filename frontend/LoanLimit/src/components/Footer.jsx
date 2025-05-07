import { Link } from 'react-router-dom'
import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className=" border-neutral-800 py-8 mt-10">
      <div className="container mx-auto px-4">        
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500">© {currentYear} LoanLimit. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to='/documentation' className="text-neutral-500 hover:text-neutral-300 transition">Documentation</Link>
            <Link to="/termsofservice" className="text-neutral-500 hover:text-neutral-300 transition">Terms of Service</Link>
            <a href="https://github.com/yugvithani/LoanLimit-Loan_value_predictor" className="text-neutral-500 hover:text-neutral-300 transition">About Us</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer