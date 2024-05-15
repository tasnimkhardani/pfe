import React, { useState } from 'react';
import { TaskCard } from './task-card';

const initialTasksData = [
    { id: 1, name: "Task 1", description: "Analyse des exigences", comments: ['comment 1', 'comment 2'], validated: false },
    { id: 2, name: "Task 2", description: "Maquette initiale", comments: [], validated: false },
    { id: 3, name: "Task 3", description: "Création de l'API", comments: [], validated: false },
    { id: 4, name: "Task 4", description: "Front-end du tableau de bord", comments: [], validated: false },
    { id: 5, name: "Task 5", description: "Tests unitaires", comments: [], validated: false },
    { id: 6, name: "Task 6", description: "Tests d'intégration", comments: [], validated: false },
];

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
        <div className='flex   flex-col'>
            <h1 className="text-4xl font-bold text-gray-800 col-span-full mb-6">Gestion des Tâches</h1>
            <section className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onAddComment={handleAddComment}
                        onValidateToggle={handleValidateToggle}
                    />
                ))}
            </section>

            <div className='w-full items-center flex justify-center'>
                <button className='rounded-lg bg-[#4f772d] hover:bg-[#50772d92] text-white font-semibold py-4 px-12 transition duration-300 ease-in-out shadow-lg hover:shadow-xl'>
                    Valider Stage
                </button>            
            </div>
        </div>
    );
};

export default Stage;
