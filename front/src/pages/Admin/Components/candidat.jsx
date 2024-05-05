import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../axios-instance';
import Toast from 'react-hot-toast';

const Candidat = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/candidature/all');
                const transformedCandidates = response.data.map(cand => ({
                    id: cand.idCandidatures,
                    nom: `${cand.user.prenom} ${cand.user.nom}`,
                    email: cand.user.email,
                    telephone: cand.user.telephone,
                    stage: cand.sujet.titre
                }));
                setCandidates(transformedCandidates);
            } catch (error) {
                Toast.error('Erreur lors de la récupération des candidatures: ' + error.message);
            }
        };
        fetchData();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axiosInstance.put(`http://localhost:8080/candidature/accepter/${id}`);
            Toast.success(`Candidature ${id} acceptée.`);
        } catch (error) {
            Toast.error(`Erreur lors de l'acceptation de la candidature ${id}: ${error.message}`);
        }
    };

    const handleRefuse = async (id) => {
        try {
            await axiosInstance.put(`http://localhost:8080/candidature/rejeter/${id}`);
            Toast.success(`Candidature ${id} refusée.`);
        } catch (error) {
            Toast.error(`Erreur lors du refus de la candidature ${id}: ${error.message}`);
        }
    };

    return (  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Liste des Candidats au Stage</h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nom</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Téléphone</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stage</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.nom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.telephone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.stage}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button onClick={() => handleAccept(candidate.id)} className="text-green-600 hover:text-green-800 mr-3">Accepter</button>
                                    <button onClick={() => handleRefuse(candidate.id)} className="text-red-600 hover:text-red-800">Refuser</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Candidat;
