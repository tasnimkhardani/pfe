import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/register";
import Admin from "./pages/Admin/admin";
import Etudiant from "./pages/Etudiant/etudiant";
import AdminDashboard from "./pages/Admin/Components/dashboard";
import EtudiantDashboard from "./pages/Etudiant/Components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./pages/Admin/Components/manage-users";
import GestionSujet from "./pages/Admin/Components/gestion-sujet";
import AjouterUser from "./pages/Admin/Components/ajouter-user"
import AjouterSujet from "./pages/Admin/Components/ajouter-sujet";
import Avancement from "./pages/Etudiant/Components/avancement";
import Encadrant from "./pages/Encadrant/encadrant";
import Sujet from "./pages/Sujet/sujet";
import EncadrantDashboard from "./pages/Encadrant/Components/dashboard";
import Candidat from "./pages/Admin/Components/candidat";
import StagiairesAcceptes from "./pages/Admin/Components/stagaire";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }, 
        {
          path: "admin",
          element: <ProtectedRoute roleRequired="ADMIN" />,
          children: [
            {
              path: "",
              element: <Admin />,
              children: [
                { path: "dashboard", element: <AdminDashboard /> },
                { path: "manage-users", element: <ManageUsers />},
                { path: "gestion-sujet", element: <GestionSujet />},
                { path: "ajouter-user", element : <AjouterUser />},
                { path: "ajouter-sujet", element : <AjouterSujet />},
                { path: "candidats", element: <Candidat /> },
                { path: "stagaire", element: <StagiairesAcceptes />}
              ],
            }
          ],
        },
        {
          path: "etudiant",
          //element: <ProtectedRoute roleRequired="CANDIDAT" />,
          children: [
            {
              path: "",
              element: <Etudiant />,
              children: [
                { path: "dashboard", element: <EtudiantDashboard /> },
                { path: "", element: <Avancement /> }
              ],
            }
          ],
        },
        {
          path:"encadrant", element: <Encadrant />,
          children: [
            { path: "", element: <EncadrantDashboard /> },
          ],
        },
        { path:"sujet/:id", element: <Sujet />}
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
