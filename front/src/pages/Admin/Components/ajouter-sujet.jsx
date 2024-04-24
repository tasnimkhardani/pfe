import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
function AjouterSujet() {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const token = useSelector((state) => state.auth.user.access_token);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const sujetData = {
            id: Date.now(),  
            titre,
            description
        };

        try {
            const response = await axios.post('http://localhost:8080/sujet/create', sujetData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            alert('Sujet ajouté !');
        } catch (error) {
            console.error('Failed to add sujet:', error);
            alert('Failed to add sujet. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Sujet</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={titre}
                        onChange={e => setTitre(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AjouterSujet;
