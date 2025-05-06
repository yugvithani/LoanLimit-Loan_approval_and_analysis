import { motion } from 'framer-motion'
import { FiActivity, FiDatabase, FiUserCheck } from 'react-icons/fi'
import React from 'react'

function StatCard({ label, value, icon, delay = 0 }) {
  const renderIcon = () => {
    switch (icon) {
      case 'models':
        return <FiActivity size={28} className="text-primary-400" />;
      case 'accuracy':
        return <FiUserCheck size={28} className="text-primary-400" />;
      case 'applications':
        return <FiDatabase size={28} className="text-primary-400" />;
      default:
        return <FiActivity size={28} className="text-primary-400" />;
    }
  };

  return (
    <motion.div 
      className="stats-card transition-all duration-300 hover:border-primary-500/40 border border-transparent"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="mb-2">
        {renderIcon()}
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-neutral-400 text-sm">{label}</p>
      </div>
    </motion.div>
  )
}

export default StatCard