import React, { useState } from 'react';

const initialTasksData = [
    { id: 1, name: "Task 1", description: "Analyse des exigences", comments: [], validated: false },
    { id: 2, name: "Task 2", description: "Maquette initiale", comments: [], validated: false },
    { id: 3, name: "Task 3", description: "Création de l'API", comments: [], validated: false },
    { id: 4, name: "Task 4", description: "Front-end du tableau de bord", comments: [], validated: false },
    { id: 5, name: "Task 5", description: "Tests unitaires", comments: [], validated: false },
    { id: 6, name: "Task 6", description: "Tests d'intégration", comments: [], validated: false },
];

const TaskCard = ({ task, onAddComment, onValidateToggle }) => {
    const [comment, setComment] = useState("");

    const handleAddComment = () => {
        if (comment.trim() === "") {
            alert("Le commentaire ne peut pas être vide.");
            return;
        }
        onAddComment(task.id, comment);
        setComment("");
    };

    // Make sure comments is always treated as an array
    const safeComments = Array.isArray(task.comments) ? task.comments : [];

    return (
        <div className="p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2">{task.name}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <hr />
            <div>
                <span className="font-semibold">Commentaires:</span>
                {safeComments.length > 0 ? safeComments.map((c, index) => (
                    <p key={index}>{c}</p>
                )) : "Aucun commentaire"}
            </div>
            <textarea
                className="w-full p-3 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md mb-2"
                placeholder="Ajouter un commentaire..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <div className='flex flex-row justify-between'>

            <button 
                className="bg-zinc-700 hover:bg-zinc-800 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddComment}
                >
                Ajouter Commentaire
            </button>
            <button 
                className={`ml-4 py-2 px-4 rounded focus:outline-none ${task.validated ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold`}
                onClick={() => onValidateToggle(task.id)}
                >
                {task.validated ? 'Invalider' : 'Valider'}
            </button>
                </div>
        </div>
    );
};

const Stage = () => {
    const [tasks, setTasks] = useState(initialTasksData);

    const handleAddComment = (id, newComment) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                return { ...task, comments: [...task.comments, newComment] };
            }
            return task;
        }));
    };

    const handleValidateToggle = (id) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                return { ...task, validated: !task.validated };
            }
            return task;
        }));
    };

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <h1 className="text-4xl font-bold text-gray-800 col-span-full mb-6">Gestion des Tâches</h1>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onAddComment={handleAddComment}
                    onValidateToggle={handleValidateToggle}
                />
            ))}
        </div>
    );
};

export default Stage;
