import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../axios-instance';
import Toast from 'react-hot-toast';
import UserDetailsModal from './UserDetailsModal';

const Candidat = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/candidature/all');
                const transformedCandidates = response.data.map(cand => ({
                    id: cand.idCandidatures,
                    nom: `${cand.user.prenom} ${cand.user.nom}`,
                    email: cand.user.email,
                    telephone: cand.user.telephone,
                    stage: cand.sujet.titre,
                    cvId: cand.cvId,
                    lettreDeMotivationId: cand.lettreDeMotivationId
                }));
                setCandidates(transformedCandidates);
            } catch (error) {
                Toast.error('Erreur lors de la récupération des candidatures: ' + error.message);
            }
        };
        fetchData();
    }, []);

    const handleDownloadCV = async (fileId) => {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/candidature/download/${fileId}`, {
                responseType: 'blob', // Important pour traiter les données binaires du fichier
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `CV_${fileId}.pdf`); // Nom du fichier à télécharger
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            Toast.error('Erreur lors du téléchargement du CV: ' + error.message);
        }
    };

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

    const handleViewDetails = (candidate) => {
        setSelectedUser(candidate);
        setDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
        setSelectedUser(null);
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Détail</th>
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button onClick={() => handleViewDetails(candidate)} className="text-blue-500 hover:text-blue-700">
                                        Voir détail
                                    </button>
                                </td>
                                <td className="px-6 py-4 space-x-2 whitespace-nowrap text-sm text-gray-500">
                                    <button onClick={() => handleDownloadCV(candidate.cvId)} className="text-blue-600 hover:text-blue-800 mr-3">Télécharger CV</button>
                                    <button onClick={() => handleDownloadCV(candidate.lettreDeMotivationId)} className="text-blue-600 hover:text-blue-800 mr-3">Télécharger Lettre de Motivation</button>
                                    <button onClick={() => handleAccept(candidate.id)} className="text-green-600 hover:text-green-800 mr-3">Accepter</button>
                                    <button onClick={() => handleRefuse(candidate.id)} className="text-red-600 hover:text-red-800">Refuser</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {detailsModalOpen && (
                    <UserDetailsModal
                        user={selectedUser}
                        onClose={handleCloseDetailsModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Candidat;
