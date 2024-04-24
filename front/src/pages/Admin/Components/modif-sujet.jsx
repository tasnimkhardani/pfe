import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ModifierSujetModal = ({ sujet, onClose, token }) => {
    const [formData, setFormData] = useState({
        titre: sujet.titre,
        description: sujet.description
    });

    useEffect(() => {
        setFormData({
            titre: sujet.titre,
            description: sujet.description
        });
    }, [sujet]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/sujet/update/${sujet.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                toast.success('Sujet updated successfully!');
                onClose(); // Close modal on success
            } else {
                toast.error('Failed to update sujet');
            }
        } catch (error) {
            console.error('Failed to update sujet:', error);
            toast.error('Failed to update sujet');
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow">
                <div className="flex items-center justify-between pb-3">
                    <p className="text-2xl font-bold">Edit Sujet</p>
                    <button onClick={onClose} className="cursor-pointer z-50">
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Titre</label>
                        <input
                            type="text"
                            name="titre"
                            value={formData.titre}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                            Update Sujet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierSujetModal;
