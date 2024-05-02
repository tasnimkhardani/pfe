import { useState } from 'react';

const StagiairesAcceptes = () => {
    const [interns, setInterns] = useState([
        { id: 1, nom: 'Alice Dupont', email: 'alice.dupont@example.com', telephone: '0123456789', supervisor: '1' },
        { id: 2, nom: 'Bob Martin', email: 'bob.martin@example.com', telephone: '0123456788', supervisor: '3' },
        { id: 3, nom: 'Clara Lefevre', email: 'clara.lefevre@example.com', telephone: '0123456790', supervisor: '' },
        { id: 4, nom: 'David Évrard', email: 'david.evrard@example.com', telephone: '0123456791', supervisor: '2' },
        { id: 5, nom: 'Émilie Petit', email: 'emilie.petit@example.com', telephone: '0123456792', supervisor: '' },
        { id: 6, nom: 'François Rousset', email: 'francois.rousset@example.com', telephone: '0123456793', supervisor: '' }
    ]);

    const [supervisors] = useState([
        { id: 1, name: 'Monsieur Durand' },
        { id: 2, name: 'Madame Smith' },
        { id: 3, name: 'Monsieur Lee' }
    ]);

    const handleSupervisorChange = (internId, supervisorId) => {
        const updatedInterns = interns.map(intern => 
            intern.id === internId ? { ...intern, supervisor: supervisorId } : intern
        );
        setInterns(updatedInterns);
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
                            <tr key={intern.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{intern.nom}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{intern.telephone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select
                                        value={intern.supervisor}
                                        onChange={(e) => handleSupervisorChange(intern.id, e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Assigner un superviseur</option>
                                        {supervisors.map((supervisor) => (
                                            <option key={supervisor.id} value={supervisor.id}>{supervisor.name}</option>
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
