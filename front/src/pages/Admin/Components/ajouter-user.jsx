import React, { useState } from 'react';
import axios from 'axios';

function AjouterUser() {
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        role: 'USER'
    });

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/register', userData);
            console.log(response.data);
            if(response.status == 200){
                alert('Utilisateur ajouté avec succès');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text"
                    name="nom"
                    value={userData.nom}
                    onChange={handleChange}
                    placeholder="Nom"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                    type="text"
                    name="prenom"
                    value={userData.prenom}
                    onChange={handleChange}
                    placeholder="Prénom"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                    type="text"
                    name="telephone"
                    value={userData.telephone}
                    onChange={handleChange}
                    placeholder="Telephone"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select 
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">CANDIDAT</option>
                    <option value="ADMIN">ACAD_SUPERVISOR</option>
                    <option value="ADMIN">PROF_SUPERVISOR</option>
                    <option value="ADMIN">INTERN</option>

                </select>
                <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                    Add User
                </button>
            </form>
        </div>
    );
}

export default AjouterUser;