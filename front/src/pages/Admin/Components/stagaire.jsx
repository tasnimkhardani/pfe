import { useState, useEffect } from 'react';
import axiosInstance from '../../../../axios-instance';
const StagiairesAcceptes = () => {
    const [interns, setInterns] = useState([]);
    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        // Fetching accepted interns
        axiosInstance.get('candidature/accepete')
            .then(response => setInterns(response.data))
            .catch(error => console.error('Failed to fetch interns', error));

        // Fetching supervisors
        axiosInstance.get('encadrants')
            .then(response => setSupervisors(response.data))
            .catch(error => console.error('Failed to fetch supervisors', error));
    }, []);

    const handleSupervisorChange = (internId, supervisorId) => {
        axiosInstance.post('candidature/encadrant', {
            Encadrant_Id: supervisorId,
            Intern_Id: internId
        })
        .then(() => {
            const updatedInterns = interns.map(intern =>
                intern.idCandidatures === internId ? { ...intern, supervisor: supervisorId } : intern
            );
            setInterns(updatedInterns);
        })
        .catch(error => console.error('Failed to assign supervisor', error));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Stagiaires Acceptés</h1>
            
            {/* List of accepted interns */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nom</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Téléphone</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Superviseur</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {interns.map((intern) => (
                            <tr key={intern.idCandidatures}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{intern.user.nom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.user.telephone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select
                                        value={intern.supervisor || ''}
                                        onChange={(e) => handleSupervisorChange(intern.idCandidatures, e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Assigner un superviseur</option>
                                        {supervisors.map((supervisor) => (
                                            <option key={supervisor.id} value={supervisor.id}>{supervisor.nom}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StagiairesAcceptes;
