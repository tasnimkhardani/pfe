import React, { useState } from 'react';

const mockInternships = [
  { id: 1, title: "Développeur Front-End", company: "Tech Innovate", location: "Paris, France" },
  { id: 2, title: "Analyste de Données", company: "DataWiz", location: "Lyon, France" },
  { id: 3, title: "Ingénieur Logiciel", company: "CodeCraft", location: "Marseille, France" },
  // Add more mock data as needed
];

const Stage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(mockInternships);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    const filteredResults = mockInternships.filter(internship =>
      internship.title.toLowerCase().includes(query) ||
      internship.company.toLowerCase().includes(query) ||
      internship.location.toLowerCase().includes(query)
    );
    setResults(filteredResults);
  };

  return (
    <div className="container mx-auto px-4 py-8" >
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Rechercher des stages..."
          className="w-full p-4 text-lg rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4" id="learn-more">
        {results.map(internship => (
          <div key={internship.id} className="flex justify-between  items-end bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
            <div>
            <h3 className="text-xl font-bold cursor-pointer">{internship.title}</h3>
            <p className="text-gray-800">{internship.company}</p>
            <p className="text-gray-600">{internship.location}</p>
            </div>
            <button className='mt-8 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1'>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stage;
