import { useState } from 'react';

const Candidat = () => {
    const [candidates] = useState([
        { id: 1, nom: 'Alice Dupont', email: 'alice.dupont@example.com', telephone: '0123456789', stage: 'Développeur Web' },
        { id: 3, nom: 'Clara Lefevre', email: 'clara.lefevre@example.com', telephone: '0123456790', stage: 'Développeur Web' },
        { id: 1, nom: 'Alice Dupont', email: 'alice.dupont@example.com', telephone: '0123456789', stage: 'Devops' },

        { id: 2, nom: 'Bob Martin', email: 'bob.martin@example.com', telephone: '0123456788', stage: 'Analyste de données' },
        { id: 3, nom: 'Clara Lefevre', email: 'clara.lefevre@example.com', telephone: '0123456790', stage: 'Designer UI/UX' },
        
    ]);

    const handleAccept = (id) => {
        console.log('Accepté:', id);
        // Here you can add logic to process the acceptance
    };

    const handleRefuse = (id) => {
        console.log('Refusé:', id);
        // Here you can add logic to process the refusal
    };

    return (  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Liste des Candidats au Stage</h1>
            
            {/* List of candidates */}
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
