import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import React from 'react'

function FeatureCard({ icon, title, description, ctaText, ctaLink, delay = 0 }) {
  return (
    <motion.div 
      className="card flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-900/50 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <p className="text-neutral-300 mb-6 flex-grow">{description}</p>
      
      <Link 
        to={ctaLink} 
        className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors group"
      >
        <span>{ctaText}</span>
        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  )
}

export default FeatureCard