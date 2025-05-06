import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBarChart2, FiShield, FiClock, FiFileText, FiArrowRight, FiUser } from 'react-icons/fi'
import StatCard from '../components/StatCard'
import FeatureCard from '../components/FeatureCard'
import React from 'react'

function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
  
  const stats = [
    { label: 'Supported Models', value: '15+', icon: 'models' },
    { label: 'Accuracy Rate', value: '97.4%', icon: 'accuracy' },
    { label: 'Applications Processed', value: '1.2M+', icon: 'applications' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/40 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-secondary-900/30 to-transparent rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary-400">LoanLimit</span>
            </motion.h1>
            
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI-Powered Loan Approval & Risk Analysis System
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Harness the power of machine learning to automatically analyze loan applications 
              and identify risk patterns for more accurate lending decisions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/dashboard" className="btn btn-primary flex items-center justify-center gap-2">
                Try It Now <FiArrowRight />
              </Link>
              <Link to="/admin" className="btn btn-secondary flex items-center justify-center gap-2">
                Admin Login <FiUser />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stat Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<FiBarChart2 className="text-primary-400" size={24} />}
              title="Loan Risk Detection"
              description="Our ML model analyzes loan application patterns in real-time, providing instant risk identification with confidence scores."
              ctaText="Start Analysis"
              ctaLink="/analysis"
              delay={0}
            />
            
            <FeatureCard
              icon={<FiFileText className="text-primary-400" size={24} />}
              title="Application Overview"
              description="Comprehensive view of all loan applications, their status, risk scores, and approval recommendations."
              ctaText="View Applications"
              ctaLink="/dashboard"
              delay={0.1}
            />
            
            <FeatureCard
              icon={<FiShield className="text-primary-400" size={24} />}
              title="Security Features"
              description="End-to-end encryption, real-time fraud detection, and comprehensive security reports for your peace of mind."
              ctaText="Learn More"
              ctaLink="/documentation"
              delay={0.2}
            />
            
            <FeatureCard
              icon={<FiClock className="text-primary-400" size={24} />}
              title="Real-time Processing"
              description="Process loan applications instantly with our high-performance AI system. Get results in seconds, not days."
              ctaText="See Performance"
              ctaLink="/documentation"
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-primary-900/70 to-secondary-900/70 rounded-2xl p-10 text-center backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Loan Approval Process?</h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join the financial institutions that have increased their approval accuracy by up to 35% 
              while reducing risk exposure by 42% using LoanLimit.
            </p>
            <Link to="/dashboard" className="btn btn-primary inline-flex items-center justify-center gap-2">
              Get Started Today <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage