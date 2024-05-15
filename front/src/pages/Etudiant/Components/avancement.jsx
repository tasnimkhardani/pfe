import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaCheckCircle, FaPaperclip } from 'react-icons/fa';

import CircularProgress from './circular-progress';
const sprints = [
    {
        id: 1,
        name: "Tache 1",
        description: "Conception initiale et configuration",
        deadline: "2024-04-01",
        validated: true,
        tasks: ["Analyse des exigences", "Maquette initiale"],
        feedback: "Bon travail sur les tâches initiales! Votre conception de base est solide.",
        progress: 100
    },
    {
        id: 2,
        name: "Tache 2",
        description: "Développement des fonctionnalités clés",
        deadline: "2024-05-15",
        validated: false,
        progress: 60
    },
    {
        id: 3,
        name: "Tache 3",
        description: "Tests et débogage",
        deadline: "2024-06-05",
        validated: false,
        progress: 0
    },
];

const Avancement = () => {
    const [progressUpdates, setProgressUpdates] = useState({});
    const [submittedUpdates, setSubmittedUpdates] = useState({});
    const [fileAttachments, setFileAttachments] = useState({});

    useEffect(() => {
        const initialFiles = sprints.reduce((acc, sprint) => ({ ...acc, [sprint.id]: [] }), {});
        setFileAttachments(initialFiles);
    }, []);

    const handleProgressChange = (id, value) => {
        setProgressUpdates(prev => ({ ...prev, [id]: value }));
    };

    const handleFileAttachment = (id, files) => {
        setFileAttachments(prev => ({ ...prev, [id]: [...prev[id], ...files] }));
    };

    const handleSubmit = (id) => {
        const sprintUpdates = submittedUpdates[id] || [];
        sprintUpdates.push({ text: progressUpdates[id], files: fileAttachments[id] });
        setSubmittedUpdates(prev => ({ ...prev, [id]: sprintUpdates }));
        setProgressUpdates(prev => ({ ...prev, [id]: "" }));
        setFileAttachments(prev => ({ ...prev, [id]: [] }));
    };

    const handleDelete = (sprintId, index) => {
        const updates = [...submittedUpdates[sprintId]];
        updates.splice(index, 1);
        setSubmittedUpdates(prev => ({ ...prev, [sprintId]: updates }));
    };

    const handleEdit = (sprintId, index) => {
        const update = submittedUpdates[sprintId][index];
        setProgressUpdates(prev => ({ ...prev, [sprintId]: update.text }));
        setFileAttachments(prev => ({ ...prev, [sprintId]: update.files }));
        handleDelete(sprintId, index);
    };

    const calculateDeadlineDays = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end - now;
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Suivi de Progrès du Projet Étudiant</h1>

            {sprints.map((sprint) => (
                <div key={sprint.id} className={`p-6 border border-gray-200 rounded-lg shadow-lg mb-5 ${sprint.validated ? 'bg-green-100' : 'bg-white'}`}>
                    <div className="flex justify-between items-center mb-4">
                    <CircularProgress progress={sprint.progress} />


                        <h2 className="text-xl font-semibold">{sprint.name}</h2>
                        <span className="text-sm font-medium text-gray-500">Échéance dans {calculateDeadlineDays(sprint.deadline)} jours</span>
                    </div>
                    <p className="text-gray-600 mb-3">{sprint.description}</p>
                    {sprint.validated ? (
                        <>
                            <p className="text-green-600 font-medium">Ce sprint a été validé.</p>
                            <p className="text-gray-700 mt-2"><span className="font-semibold">Feedback:</span> {sprint.feedback}</p>
                            <div className="mt-4">
                                <h4 className="font-medium text-gray-700">Tâches Affectées:</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    {sprint.tasks.map((task, idx) => <li key={idx}>{task}</li>)}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                placeholder="Mettez à jour votre progrès..."
                                value={progressUpdates[sprint.id] || ""}
                                onChange={(e) => handleProgressChange(sprint.id, e.target.value)}
                            />
                            <label className="block mb-2 cursor-pointer">
                                <span className="sr-only">Choisir le fichier</span>
                                <input
                                    type="file"
                                    multiple
                                    className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                    onChange={(e) => handleFileAttachment(sprint.id, Array.from(e.target.files))}
                                />
                            </label>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                onClick={() => handleSubmit(sprint.id)}
                            >
                                Soumettre la mise à jour
                            </button>
                        </>
                    )}
                    {!sprint.validated && (
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-700">Mises à jour soumises:</h4>
                            <ul className="space-y-2 text-gray-600">
                                {submittedUpdates[sprint.id]?.map((update, index) => (
                                    <li key={index} className='bg-gray-100 rounded-lg px-3 py-2 flex items-center justify-between'>
                                        {update.text}
                                        {update.files.map((file, idx) => <FaPaperclip key={idx} className="ml-2" title={file.name} />)}

                                        <div className='flex gap-2'>
                                            <button onClick={() => handleEdit(sprint.id, index)} className='text-blue-500'>
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(sprint.id, index)} className='text-red-500'>
                                                <FaTrashAlt />
                                            </button>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Avancement;
