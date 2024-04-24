import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ModifierSujetModal from './modif-sujet';
export default function GestionSujet() {
    const token = useSelector((state) => state.auth.user.access_token);
    const [sujets, setSujets] = useState([]);
    const [currentSujet, setCurrentSujet] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:8080/sujets/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSujets(result.data);
            } catch (error) {
                console.error('Échec du chargement des sujets', error);
                toast.error('Échec du chargement des sujets');
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/sujet/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                toast.success('Sujet supprimé avec succès');
                setSujets(prevSujets => prevSujets.filter(sujet => sujet.id !== id));
            } else {
                toast.error('Échec de la suppression du sujet');
            }
        } catch (err) {
            toast.error('Échec de la suppression du sujet');
            console.error(err);
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center'>
                <input type="search" placeholder='Rechercher'
                    onChange={(e) => { /* Implémenter la logique de recherche */ }}
                    className='p-4 rounded-xl shadow-sm ml-2 w-full' />
                <Link to="/admin/ajouter-sujet">
                    <button className='bg-green-500 hover:bg-green-700 m-2 text-white font-bold px-4 py-4 max-w-xs w-full rounded-xl transition duration-150 ease-in-out'>
                        Ajouter un sujet
                    </button>
                </Link>
            </div>

            {sujets.map((item) => (
                <div key={item.id} className='flex justify-between items-center shadow-md m-2 p-4 rounded-xl'>
                    <div>
                        <h2 className='text-3xl font-bold'>{item.titre}</h2>
                        <p>{item.description}</p>
                    </div>

                    <div className='flex gap-2'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out'
                             onClick={() => setCurrentSujet(item)}
                        >Modifier</button>

                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out'
                            onClick={() => handleDelete(item.id)}
                        >Supprimer</button>
                    </div>
                </div>
            ))}
               {currentSujet && (
                <ModifierSujetModal
                    sujet={currentSujet}
                    onClose={() => setCurrentSujet(null)}
                    token={token}
                />
            )}
        </div>
    );
}
