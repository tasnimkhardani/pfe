import React, { useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sprintsData = [
  {
    id: 1,
    name: "Sprint 1",
    progress: 100,
    description: "Conception initiale et configuration",
    deadline: "2024-05-01",
    validated: true,
    tasks: ["Analyse des exigences", "Maquette initiale"],
    feedback: "Très bien fait, les bases sont solides."
  },
  {
    id: 2,
    name: "Sprint 2",
    progress: 60,
    description: "Développement des fonctionnalités clés",
    deadline: "2024-05-15",
    validated: false,
    tasks: ["Création de l'API", "Front-end du tableau de bord"],
    feedback: ""
  },
  {
    id: 3,
    name: "Sprint 3",
    progress: 30,
    description: "Tests et débogage",
    deadline: "2024-06-05",
    validated: false,
    tasks: ["Tests unitaires", "Tests d'intégration"],
    feedback: ""
  },
  // ... more sprints
];

const SupervisorDashboard = () => {
  const [sprints, setSprints] = useState(sprintsData);
  const [expandedSprint, setExpandedSprint] = useState(null);

  const toggleExpandSprint = (id) => {
    setExpandedSprint(expandedSprint === id ? null : id);
  };

  const handleFeedbackChange = (id, feedback) => {
    setSprints(sprints.map(sprint => {
      if (sprint.id === id) {
        return { ...sprint, feedback: feedback };
      }
      return sprint;
    }));
  };

  const submitFeedback = (id) => {
    const sprint = sprints.find(s => s.id === id);
    alert(`Submitting feedback for ${sprint.name}: "${sprint.feedback}"`);
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Tableau de Bord du Superviseur</h1>
      {sprints.map((sprint) => (
        <div key={sprint.id} className="border p-4 rounded-lg shadow-md bg-gray-50 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{sprint.name}</h2>
            <button onClick={() => toggleExpandSprint(sprint.id)}>
              {expandedSprint === sprint.id ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-2">{sprint.description}</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${sprint.progress}%` }}></div>
          </div>
          {expandedSprint === sprint.id && (
            <>
              <div className="mb-4">
                <h3 className="text-md font-semibold">Tâches</h3>
                <ul className="list-disc ml-5 text-sm">
                  {sprint.tasks.map((task, index) => <li key={index}>{task}</li>)}
                </ul>
              </div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Ajouter un feedback..."
                value={sprint.feedback}
                onChange={(e) => handleFeedbackChange(sprint.id, e.target.value)}
              />
              <button
                className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => submitFeedback(sprint.id)}
              >
                Soumettre Feedback
              </button>
            </>
          )}
          {sprint.validated && <FaCheck className="text-green-500 mt-2" />}
        </div>
      ))}
    </div>
  );
};

export default SupervisorDashboard;
