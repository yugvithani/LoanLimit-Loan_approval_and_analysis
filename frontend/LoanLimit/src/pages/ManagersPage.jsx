import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiLogOut } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import {useHttpClient} from '../components/HttpHook'
import { AuthContext } from '../components/AuthContext';

function ManagersPage() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [managers, setManagers] = useState([]);
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
  const [emailError, setEmailError] = useState('');
  const {logout} = useContext(AuthContext);

  // Fetch managers using hook
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const data = await sendRequest(
          'http://localhost:8000/admin/all-manager',
          'GET',
          null,
          {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        );
        setManagers(data);
      } catch (err) {
        console.error('Error fetching managers:', err);
      }
    };

    fetchManagers();
  }, [sendRequest]);

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }
    setEmailError('');
    try {
      const response = await sendRequest(
        'http://localhost:8000/admin/create-manager',
        'POST',
        JSON.stringify({
          branchName: formData.branch,
          city: formData.city,
          managerName: formData.name,
          managerMail: formData.email,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );
  
      if (response) {
        setManagers(prev => [...prev, {
          branchName: formData.branch,
          city: formData.city,
          managerName: formData.name,
          managerMail: formData.email,
        }]);
        setFormData({ name: '', branch: '', city: '', email: '' });
        setShowAddForm(false); // ✅ Close modal
      }
    } catch (err) {
      console.error('Error adding manager:', err);
    }
  };
  

  const handleDelete = async () => {
    try {
      await sendRequest(
        `http://localhost:8000/admin/delete-manager/${selectedManager.userName}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );
      setManagers(managers.filter((m) => m.managerId !== selectedManager.managerId));
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Error deleting manager:', err);
    }
  };

  const openEditForm = (manager) => {

    setSelectedManager(manager);
    setFormData({ name: manager.name, email: manager.email });
    setShowEditForm(true);
  };


  const handleEdit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await sendRequest(
        'http://localhost:8000/admin/change-manager',
        'POST',
        JSON.stringify({
          managerId: selectedManager.managerId,
          managerName: formData.name,
          managerMail: formData.email,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );
  
      if (response) {
        setManagers(managers.map(m =>
          m.managerId === selectedManager.managerId
            ? { ...m, managerName: formData.name, managerMail: formData.email }
            : m
        ));
        setShowEditForm(false); // ✅ Close modal
      }
    } catch (err) {
      console.error('Error updating manager:', err);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="flex justify-center mb-4">
          <Loader2 className="animate-spin text-white w-6 h-6" />
        </div>
      )}
      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          <p>{error}</p>
          <button onClick={clearError} className="underline text-sm mt-1">
            Dismiss
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Branch Managers</h1>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus className="mr-2" /> Add Manager
        </button>
        <div className="hidden md:flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-neutral-300 hover:text-white transition" onClick={()=>logout()}>
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managers?.map(manager => (
          <motion.div 
            key={manager.managerId}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{manager.managerName}</h3>
            <p className="text-neutral-400 mb-1">Branch: {manager.branchName}</p>
            <p className="text-neutral-400 mb-1">City: {manager.city}</p>
            <p className="text-neutral-400 mb-4">Email: {manager.managerMail}</p>
            
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
                Are you sure you want to delete {selectedManager?.managerName}? This action cannot be undone.
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