import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import UserFormModal from './user-form-modal';  // This is your modal component for adding/editing users
import axiosInstance from '../../../../axios-instance';
const GestionUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const token = useSelector(state => state.auth.user.access_token);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('http://localhost:8080/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setError('Failed to fetch users. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`http://localhost:8080/user/delete/${userId}`);
            fetchUsers();
            toast.success('Utilisateur supprimé avec succès');
        } catch (err) {
            console.error("Failed to delete user:", err);
            toast.error('Échec de la suppression de l’utilisateur');
        }
    };
  
    const handleAddOrEditUser = (user) => {
        setSelectedUser(user);
        setEditMode(user !== null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
        setEditMode(false);
    };


    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestion des Utilisateurs</h2>
            <button onClick={() => handleAddOrEditUser(null)} className='bg-teal-400 p-4 rounded-md text-white'>
                Ajouter Utilisateur
            </button>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-6">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="py-3 px-6">Utilisateur</th>
                            <th scope="col" className="py-3 px-6">Email</th>
                            <th scope="col" className="py-3 px-6">Téléphone</th>
                            <th scope="col" className="py-3 px-6">Role</th>
                            <th scope="col" className="py-3 px-6">Statut</th>
                            <th scope="col" className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="bg-white border-b hover:bg-gray-50 ">
                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{user.nom} {user.prenom}</td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">{user.telephone}</td>
                                <td className="py-4 px-6">{user.role}</td>
                                <td className="py-4 px-6">
                                    <div className={`flex items-center justify-start gap-2 text-sm font-medium ${user.enabled ? 'text-green-500' : 'text-red-500'}`}>
                                        {user.enabled ? 'Actif' : 'Inactif'} {user.enabled ? <FaCheckCircle /> : <FaTimesCircle />}
                                    </div>
                                </td>
                                <td className="py-4 px-6 space-x-4">
                             
                                    <button onClick={() => handleAddOrEditUser(user)} className="text-blue-500 hover:text-blue-700">
                                        <FaEdit className="inline mr-2" />Modifier
                                    </button>
                                    <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700 ml-4">
                                        <FaTrashAlt className="inline mr-2" />Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <UserFormModal
                    user={selectedUser}
                    onClose={handleCloseModal}
                    onUpdate={fetchUsers}
                    token={token}
                    editMode={editMode}
                />
            )}
          
        </div>
    );
};

export default GestionUsers;
