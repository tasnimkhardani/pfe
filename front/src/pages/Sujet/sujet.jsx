import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Home/Components/header";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios-instance";
import Toast from "react-hot-toast";
import axios from "axios";
const Sujet = () => {
    const token = useSelector(state => state.auth.user.access_token);
    
    const role = useSelector(state => state.auth.user.user.role);
    const { id } = useParams();
    const [sujet, setSujet] = useState({});
    const [cvFile, setCvFile] = useState(null);

    useEffect(() => {
        getSujetById();
    }, [id]);

    async function getSujetById() {
        try {
            const res = await axiosInstance.get(`sujet/get/${id}`);
            setSujet(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('sujetID', id);
        data.append('CV', cvFile);
        console.log(data);
        try {
            await axiosInstance.post('postuler', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Toast.success('CV soumis avec succès !');
        } catch (error) {
            console.error('Erreur lors de la soumission du CV:', error);
        }
    };
    

    return (
        <div className="w-full">
            <Header />

            <div className="relative flex flex-col items-center justify-center h-80 bg-gradient-to-r from-blue-400 to-purple-600">
                <h1 className="text-5xl text-white capitalize font-bold tracking-wider">{sujet.titre}</h1>
                <p className="text-xl font-medium text-gray-800">{sujet.description}</p>
            </div>
            {role === 'CANDIDAT' &&
                <form className="flex flex-col items-center justify-center h-auto p-4 w-full" onSubmit={handleSubmit}>
                    <div className="mb-6 w-full max-w-xl">
                        <label htmlFor="cvFile" className="block mb-2 text-sm font-medium text-gray-900">CV</label>
                        <input type="file" id="cvFile" name="cvFile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleFileChange} required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Soumettre le CV
                    </button>
                </form>
            }
        </div>
    );
}

export default Sujet;
