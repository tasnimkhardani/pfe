import React, { useState } from 'react';
export const TaskCard = ({ task, onAddComment, onValidateToggle }) => {
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
                className="bg-[#38A3A5] hover:bg-[#38a3a589] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddComment}
                >
                Ajouter Commentaire
            </button>
            <button 
                className={`ml-4 py-2 px-4 rounded focus:outline-none ${task.validated ? 'bg-red-500 hover:bg-red-700' : 'bg-[#57CC99] hover:bg-green-700'} text-white font-bold`}
                onClick={() => onValidateToggle(task.id)}
                >
                {task.validated ? 'Invalider' : 'Valider'}
            </button>
                </div>
        </div>
    );
};