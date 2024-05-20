import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export const TaskCard = ({ task, comments, onAddComment, onValidateToggle }) => {
    const [newComment, setNewComment] = useState("");

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        onAddComment(task.id, newComment);
        setNewComment("");
    };

    return (
        <div className={`p-6 border border-gray-300 rounded-lg shadow-lg mb-5 ${task.validated ? 'bg-green-100' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{task.name}</h2>
                <button onClick={() => onValidateToggle(task.id)} className={`text-${task.validated ? 'green' : 'gray'}-500`}>
                    {task.validated ? 'Validated' : 'Validate'}
                </button>
            </div>
            <p className="text-gray-600 mb-3">{task.description}</p>
            <div>
                <h4 className="font-medium text-gray-700">Commentaires:</h4>
                <ul className="list-disc list-inside text-gray-700">
                    {comments.map((comment) => (
                        <li key={comment.id} className="mb-2">
                            <div className="flex justify-between gap-2">
                                <p className='text-sm font-bold text-gray-700 capitalize'>{comment.auteurName}</p>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                            <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                    placeholder="Ajouter un commentaire..."
                    value={newComment}
                    onChange={handleCommentChange}
                />
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={handleAddComment}
                >
                    Ajouter Commentaire
                </button>
            </div>
        </div>
    );
};
