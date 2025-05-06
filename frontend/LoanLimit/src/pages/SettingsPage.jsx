import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiLock, FiBell, FiDatabase, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    applicationUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
  })
  
  const [passwordChanged, setPasswordChanged] = useState(false)
  
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    })
  }
  
  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Password change logic would go here
    setPasswordChanged(true)
    setTimeout(() => setPasswordChanged(false), 3000)
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-neutral-400">
          Manage your profile, security, and application preferences
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs */}
        <motion.div 
          className="lg:w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-neutral-800/30 rounded-lg overflow-hidden">
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'profile' ? 'bg-primary-600/20 border-l-4 border-primary-500 text-primary-400' : 'hover:bg-neutral-700/30 text-neutral-300'}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser className="mr-3" /> Profile
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'security' ? 'bg-primary-600/20 border-l-4 border-primary-500 text-primary-400' : 'hover:bg-neutral-700/30 text-neutral-300'}`}
              onClick={() => setActiveTab('security')}
            >
              <FiLock className="mr-3" /> Security
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'notifications' ? 'bg-primary-600/20 border-l-4 border-primary-500 text-primary-400' : 'hover:bg-neutral-700/30 text-neutral-300'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell className="mr-3" /> Notifications
            </button>
            
            <button
              className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'data' ? 'bg-primary-600/20 border-l-4 border-primary-500 text-primary-400' : 'hover:bg-neutral-700/30 text-neutral-300'}`}
              onClick={() => setActiveTab('data')}
            >
              <FiDatabase className="mr-3" /> Data Preferences
            </button>
          </div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary-900 flex items-center justify-center mr-4">
                    <span className="text-3xl text-primary-400 font-medium">JS</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">John Smith</h3>
                    <p className="text-neutral-400">Lead Loan Officer</p>
                    <button className="text-primary-400 text-sm mt-1">Change avatar</button>
                  </div>
                </div>
                
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Smith"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="john.smith@example.com"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="(555) 123-4567"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        defaultValue="Lead Loan Officer"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        defaultValue="Loan Processing"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows="4"
                      defaultValue="Experienced loan officer with over 10 years in mortgage and personal lending. Specialized in risk assessment and customer relationship management."
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
              
              {passwordChanged && (
                <div className="bg-success-500/20 border border-success-500/30 text-success-500 px-4 py-3 rounded-md mb-6 flex items-center">
                  <FiCheck className="mr-2" /> Password changed successfully
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500 pr-10"
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-300 mb-1">Protect your account with 2FA</p>
                    <p className="text-neutral-500 text-sm">Currently: <span className="text-error-500">Disabled</span></p>
                  </div>
                  <button className="btn btn-secondary">
                    Enable 2FA
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">API Keys</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-300 mb-1">Manage API access to your account</p>
                    <p className="text-neutral-500 text-sm">You have 2 active API keys</p>
                  </div>
                  <button className="btn btn-secondary">
                    Manage Keys
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-300">Email Alerts</p>
                      <p className="text-neutral-500 text-sm">Receive important alerts via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.emailAlerts}
                        onChange={() => handleNotificationChange('emailAlerts')}
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary-500 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-300">Application Updates</p>
                      <p className="text-neutral-500 text-sm">Notifications about loan application status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.applicationUpdates}
                        onChange={() => handleNotificationChange('applicationUpdates')}
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary-500 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-300">Marketing Emails</p>
                      <p className="text-neutral-500 text-sm">Receive updates about new features and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.marketingEmails}
                        onChange={() => handleNotificationChange('marketingEmails')}
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary-500 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-300">Security Alerts</p>
                      <p className="text-neutral-500 text-sm">Get notified about suspicious account activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notificationSettings.securityAlerts}
                        onChange={() => handleNotificationChange('securityAlerts')}
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary-500 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Notification Frequency</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Email Digest Frequency
                  </label>
                  <select className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500">
                    <option>Real-time</option>
                    <option>Daily Digest</option>
                    <option>Weekly Digest</option>
                    <option>Monthly Digest</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">Data & Privacy</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Data Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="data-analysis"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 bg-neutral-700 border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor="data-analysis" className="ms-2 text-neutral-300">
                      Allow data analysis to improve services
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="third-party"
                      type="checkbox"
                      defaultChecked={false}
                      className="w-4 h-4 bg-neutral-700 border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor="third-party" className="ms-2 text-neutral-300">
                      Share data with third-party partners
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="analytics"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 bg-neutral-700 border-neutral-600 rounded focus:ring-primary-500 focus:ring-2"
                    />
                    <label htmlFor="analytics" className="ms-2 text-neutral-300">
                      Allow usage analytics
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Data Export</h3>
                <p className="text-neutral-400 mb-4">
                  Download all your personal data and loan application history.
                </p>
                <button className="btn btn-secondary">
                  Request Data Export
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Account Deletion</h3>
                <p className="text-neutral-400 mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <button className="px-4 py-2 bg-error-500/20 text-error-500 border border-error-500/30 rounded-md hover:bg-error-500/30 transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage