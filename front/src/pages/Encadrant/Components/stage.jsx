import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axiosInstance from '../../../../axios-instance';
import { FaEdit, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Toast from 'react-hot-toast';
const Stage = () => {
    const [tasks, setTasks] = useState([]);
    const [comments, setComments] = useState({});
    const [progressUpdates, setProgressUpdates] = useState({});
    const [fileAttachments, setFileAttachments] = useState({});
    const [editCommentModal, setEditCommentModal] = useState(false);
    const [editComment, setEditComment] = useState({
        id: null,
        content: '',
        tacheID: null
    });
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const userId = useSelector(state => state.auth.user.user.id);

    useEffect(() => {
        getMyAdvancement();
        setCurrentUser(userId);
    }, [id]);

    async function getMyAdvancement() {
        try {
            const response = await axiosInstance.get(`task/getAll/${id}`);
            setTasks(response.data);
            response.data.forEach(async (task) => {
                await fetchComments(task.id);
            });
        } catch (err) {
            console.log(err);
        }
    }

    const fetchComments = async (taskId) => {
        try {
            const response = await axiosInstance.get(`commentaire/getAll?tacheId=${taskId}`);
            setComments(prev => ({ ...prev, [taskId]: response.data }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleProgressChange = (id, value) => {
        setProgressUpdates(prev => ({ ...prev, [id]: value }));
    };

    const handleFileAttachment = (id, files) => {
        setFileAttachments(prev => ({ ...prev, [id]: [...(prev[id] || []), ...files] }));
    };

    const handleSubmit = async (id) => {
        const commentData = {
            content: progressUpdates[id],
            tacheID: id,
            date: new Date().toISOString()
        };
        if (commentData.content === "") {
            Toast.error('Veuillez remplir le champ commentaire')
            return;
        }

        try {
            await axiosInstance.post('commentaire/create', commentData);
            Toast.success('Commentaire ajouté avec succès');
            await fetchComments(id);
            setProgressUpdates(prev => ({ ...prev, [id]: "" }));
            setFileAttachments(prev => ({ ...prev, [id]: [] }));
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleOpenEditCommentModal = (comment) => {
        setEditComment({
            id: comment.id,
            content: comment.content,
            tacheID: comment.tacheID
        });
        setEditCommentModal(true);
    };

    const handleUpdateComment = async () => {
        const { id, content, tacheID } = editComment;
        const updatedComment = { content, date: new Date().toISOString() };
        try {
            await axiosInstance.put(`commentaire/update/${id}`, updatedComment);
            await fetchComments(tacheID);
            setEditCommentModal(false);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId, tacheId) => {
        try {
            await axiosInstance.delete(`commentaire/delete/${commentId}`);
            await fetchComments(tacheId);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const onValidateToggle = async (taskId) => {
        const task = tasks.find(t => t.id === taskId);
        const newValidStatus = true

        try {
            await axiosInstance.put(`task/valide/${taskId}/${newValidStatus}`);
            getMyAdvancement();  // Refresh the task list to update the UI
        } catch (error) {
            console.error('Error updating task validation status:', error);
        }
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
            <section className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className={`p-6 border border-gray-300 rounded-lg shadow-lg mb-5 ${task.validated ? 'bg-green-100' : 'bg-white'} transition-transform transform hover:scale-105`}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">{task.name}</h2>
                                <span className="text-sm font-medium text-gray-500">Échéance dans {calculateDeadlineDays(task.deadline)} jours</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-3">{task.description}</p>

                        <>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                placeholder="Mettez à jour votre progrès..."
                                value={progressUpdates[task.id] || ""}
                                onChange={(e) => handleProgressChange(task.id, e.target.value)}
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
                                    onChange={(e) => handleFileAttachment(task.id, Array.from(e.target.files))}
                                />
                            </label>
                            <div className='flex flex-row justify-between'>
                                <button
                                    className="bg-[#38A3A5] hover:bg-[#38a3a589] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => handleSubmit(task.id)}
                                >
                                    Ajouter Commentaire
                                </button>
                                <button
                                    className={`ml-4 py-2 px-4 rounded focus:outline-none ${task.valide ? 'bg-red-500 hover:bg-red-700' : 'bg-[#57CC99] hover:bg-green-700'} text-white font-bold`}
                                    onClick={() => onValidateToggle(task.id)}
                                >
                                    {task.valide ? 'Invalider' : 'Valider'}

                                </button>
                            </div>
                        </>

                        {comments[task.id] && comments[task.id].length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-medium text-gray-700">Commentaires:</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    {comments[task.id].map((comment) => (
                                        <li key={comment.id} className="flex justify-between items-start mb-2">
                                            <div className=' w-full'>
                                                <div className="flex justify-between gap-2">
                                                    <p className='text-sm font-bold text-gray-700 capitalize'>{comment.auteurName}</p>
                                                    {currentUser && comment.auteurID === currentUser && (
                                                        <div className='flex gap-2'>
                                                            <button
                                                                onClick={() => handleOpenEditCommentModal(comment)}
                                                                className="text-blue-500"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteComment(comment.id, task.id)}
                                                                className="text-red-500"
                                                            >
                                                                <FaTrashAlt />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <hr className='' />
                                                <p className="text-gray-600">{comment.content}</p>
                                                <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        
            {editCommentModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className=" w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Modifier Commentaire
                                        </h3>
                                        <div className="mt-2 w-full ">
                                            <textarea
                                                name="content"
                                                placeholder="Commentaire"
                                                value={editComment.content}
                                                onChange={(e) => setEditComment(prev => ({ ...prev, content: e.target.value }))}
                                                className="w-full p-2 border border-gray-300 rounded mb-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleUpdateComment}
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setEditCommentModal(false)}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stage;
