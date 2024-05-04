import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Auth/Login/login";
import Register from "./pages/Auth/Register/register";
import Admin from "./pages/Admin/admin";
import Etudiant from "./pages/Etudiant/etudiant";
import AdminDashboard from "./pages/Admin/Components/dashboard";
import EtudiantDashboard from "./pages/Etudiant/Components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GestionUsers from "./pages/Admin/Components/gestion-users";
import GestionSujet from "./pages/Admin/Components/gestion-sujet";
import Avancement from "./pages/Etudiant/Components/avancement";
import Encadrant from "./pages/Encadrant/encadrant";
import Sujet from "./pages/Sujet/sujet";
import Candidat from "./pages/Admin/Components/candidat";
import StagiairesAcceptes from "./pages/Admin/Components/stagaire";
import Stage from "./pages/Encadrant/Components/stage";
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
                { path: "gestion-users", element: <GestionUsers />},
                { path: "gestion-sujet", element: <GestionSujet />},
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
            { path: "stage/:id", element: <Stage />}
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
