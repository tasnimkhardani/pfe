import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Home/Components/header";
import { useSelector } from "react-redux";

const Sujet = () => {
    const role = useSelector((state) => state.auth.user.user.role)
    const { id } = useParams();
    const [sujet, setSujet] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cvFile: null,
        coverLetter: null
    });

    useEffect(() => {
        getSujetById();
    }, [id]);

    async function getSujetById() {
        try {
            const res = await axios.get(`http://localhost:8080/sujet/get/${id}`);
            setSujet(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('cv', formData.cvFile);
        data.append('coverLetter', formData.coverLetter);

        try {
            await axios.post('http://localhost:8080/submit-application', data);
            alert('Candidature soumise avec succès !');
        } catch (error) {
            console.error('Erreur lors de la soumission de la candidature:', error);
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
                        <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Nom complet</label>
                        <input type="text" id="fullName" name="fullName" placeholder="Votre nom complet"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-6 w-full max-w-xl">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" name="email" placeholder="votre.email@example.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleInputChange} />
                    </div>
                    <div className="mb-6 w-full max-w-xl">
                        <label htmlFor="cvFile" className="block mb-2 text-sm font-medium text-gray-900">CV</label>
                        <input type="file" id="cvFile" name="cvFile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleFileChange} />
                    </div>
                    <div className="mb-6 w-full max-w-xl">
                        <label htmlFor="coverLetter" className="block mb-2 text-sm font-medium text-gray-900">Lettre de motivation</label>
                        <input type="file" id="coverLetter" name="coverLetter"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Soumettre la candidature
                    </button>
                </form>
            }
        </div>
    );
}

export default Sujet;
