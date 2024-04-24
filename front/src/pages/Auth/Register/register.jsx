import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try{
            const response = await axios.post('http://localhost:8080/register', {
                nom,
                prenom,
                email,
                telephone,
                password,
                role
            });
            if(response.data){
                navigate('/login')
            }
        }
        catch(err){
            console.log(err)
        }
       
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full space-y-8 p-8 shadow-lg rounded-2xl bg-white">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    S'inscrire
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input 
                            id="nom"
                            name="nom"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        <input 
                            id="prenom"
                            name="prenom"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                        <input 
                            id="email-address"
                            name="email"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            id="telephone"
                            name="telephone"
                            type="tel"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Téléphone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                      
                    </div>
                        <select 
                            id="role"
                            name="role"
                            required
                            className="mt-1 appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Sélectionner un rôle</option>
                            <option value="candidat">CANDIDAT</option>
                            <option value="supervisor">SUPERVISOR</option>
                        </select>
            
                    <button 
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                       
                    >
                        S'inscrire
                    </button>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline">Connectez-vous ici</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
