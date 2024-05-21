import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-hot-toast';
import * as yup from 'yup';

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const schema = yup.object().shape({
        nom: yup.string().required('Nom est requis'),
        prenom: yup.string().required('Prénom est requis'),
        email: yup.string().email('Email n\'est pas valide').required('Email est requis'),
        telephone: yup.string().matches(/^\d{8}$/, 'Téléphone doit contenir 8 chiffres').required('Téléphone est requis'),
        password: yup.string().min(8, 'Mot de passe doit contenir au moins 8 caractères').required('Mot de passe est requis'),
        role: yup.string().required('Rôle est requis')
    });

    const validateForm = async () => {
        try {
            await schema.validate({ nom, prenom, email, telephone, password, role }, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        try {
            const response = await axios.post('http://localhost:8080/register', {
                nom,
                prenom,
                email,
                telephone,
                password,
                role
            });
            if (response.data) {
                Toast.success('Inscription réussie !');
                navigate('/login');
            }
        } catch (err) {
            Toast.error(err.response?.data || 'Erreur lors de l\'inscription');
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
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.nom ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                        {errors.nom && <div className="text-red-500 text-sm">{errors.nom}</div>}
                        <input 
                            id="prenom"
                            name="prenom"
                            type="text"
                            required
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Prénom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                        {errors.prenom && <div className="text-red-500 text-sm">{errors.prenom}</div>}
                        <input 
                            id="email-address"
                            name="email"
                            type="text"
                            required
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        <input 
                            id="telephone"
                            name="telephone"
                            type="tel"
                            required
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Téléphone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                        {errors.telephone && <div className="text-red-500 text-sm">{errors.telephone}</div>}
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            required
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>
                    <select 
                        id="role"
                        name="role"
                        required
                        className={`mt-1 appearance-none rounded-xl relative block w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Sélectionner un rôle</option>
                        <option value="candidat">CANDIDAT</option>
                        <option value="PROF_SUPERVISOR">PROF_SUPERVISOR</option>
                    </select>
                    {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
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
