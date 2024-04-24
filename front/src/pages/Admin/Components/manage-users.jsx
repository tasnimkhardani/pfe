import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditUserModal from './modifier-user';
const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const token = useSelector((state) => state.auth.user.access_token);


    useEffect(() => {
        fetchUsers();
    }, [token]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch sujet:", error);
            setError('Failed to fetch sujet. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/user/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    const updateUser = async (user) => {
        try {
            await axios.put(`http://localhost:8080/user/update/${user.id}`, user, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
            setSelectedUser(null);
        } catch (err) {
            console.error("Failed to update user:", err);
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    const handleCloseModal = () => setSelectedUser(null);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>
            <Link to="/admin/ajouter-user">
                <button className='bg-teal-400 p-4 rounded-md'>Ajouter</button>
            </Link>
            <div className="grid gap-4">
                {users.map((user) => (
                    <div key={user.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                        <div>
                            <div className='flex gap-2'>
                                <p>Utilisateur:</p>
                                <p className="font-semibold">{user.nom}</p>
                                <p className="font-semibold">{user.prenom}</p>
                            </div>

                            <p className="font-normal text-md">Email :{user.email}</p>
                            <p className=" font-thin text-sm">Telephone :{user.telephone}</p>
                            <p>Role : {user.role}</p>
                            <p className={`flex items-center justify-start gap-2 text-sm font-medium ${user.enabled ? 'text-green-500' : 'text-red-500'}`}>
                                {user.enabled ? 'Active' : 'Inactive'} {user.enabled ? <span> <FaCheckCircle /></span> : <FaTimesCircle />}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">

                            <button onClick={() => setSelectedUser(user)} className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <FaEdit className="mr-2" />Modifier
                            </button>

                            <button onClick={() => deleteUser(user.id)} className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                <FaTrashAlt className="mr-2" />Supprimer
                            </button>
                        </div>
                    </div>
                ))}
                {selectedUser && (
                    <EditUserModal
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                        onUpdate={updateUser}
                        token={token}
                    />
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
