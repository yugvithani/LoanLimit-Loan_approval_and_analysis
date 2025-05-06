import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

function ManagersPage() {
  const [managers, setManagers] = useState([
    { id: 1, name: 'John Doe', branch: 'Main Branch', city: 'New York', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', branch: 'Downtown', city: 'Los Angeles', email: 'jane@example.com' },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    city: '',
    email: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setManagers([...managers, { id: Date.now(), ...formData }]);
    setFormData({ name: '', branch: '', city: '', email: '' });
    setShowAddForm(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setManagers(managers.map(m => 
      m.id === selectedManager.id ? { ...m, name: formData.name, email: formData.email } : m
    ));
    setShowEditForm(false);
  };

  const handleDelete = () => {
    setManagers(managers.filter(m => m.id !== selectedManager.id));
    setShowDeleteConfirm(false);
  };

  const openEditForm = (manager) => {
    setSelectedManager(manager);
    setFormData({ name: manager.name, email: manager.email });
    setShowEditForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Branch Managers</h1>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus className="mr-2" /> Add Manager
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managers.map(manager => (
          <motion.div 
            key={manager.id}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{manager.name}</h3>
            <p className="text-neutral-400 mb-1">Branch: {manager.branch}</p>
            <p className="text-neutral-400 mb-1">City: {manager.city}</p>
            <p className="text-neutral-400 mb-4">Email: {manager.email}</p>
            
            <div className="flex justify-end space-x-2">
              <button 
                className="p-2 text-primary-400 hover:text-primary-300"
                onClick={() => openEditForm(manager)}
              >
                <FiEdit2 />
              </button>
              <button 
                className="p-2 text-error-500 hover:text-error-400"
                onClick={() => {
                  setSelectedManager(manager);
                  setShowDeleteConfirm(true);
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          </motion.div>
        ))}

        <motion.div 
          className="card flex items-center justify-center cursor-pointer hover:border-primary-500/40 border-2 border-dashed border-neutral-700"
          onClick={() => setShowAddForm(true)}
          whileHover={{ scale: 1.02 }}
        >
          <FiPlus className="text-4xl text-neutral-500" />
        </motion.div>
      </div>

      {/* Add Manager Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="card w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Add New Manager</h2>
                <button 
                  className="text-neutral-400 hover:text-white"
                  onClick={() => setShowAddForm(false)}
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleAdd}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Branch Name
                    </label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Manager Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Manager
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Manager Modal */}
      <AnimatePresence>
        {showEditForm && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="card w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Manager</h2>
                <button 
                  className="text-neutral-400 hover:text-white"
                  onClick={() => setShowEditForm(false)}
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleEdit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Manager Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="card w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Confirm Delete</h2>
              <p className="text-neutral-300 mb-6">
                Are you sure you want to delete {selectedManager?.name}? This action cannot be undone.
              </p>

              <div className="flex justify-end">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn bg-error-500 hover:bg-error-600 text-white"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ManagersPage;