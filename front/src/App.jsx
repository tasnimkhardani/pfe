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
import Contact from "./pages/contact/contact";
import Blog from "./pages/blog/blog";
import AjouterUser from "./pages/Admin/Components/ajouter-user"
import AjouterSujet from "./pages/Admin/Components/ajouter-sujet";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }, 
        { path: "contact", element: <Contact /> },
        { path: "blog", element: <Blog /> },
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
                { path: "ajouter-sujet", element : <AjouterSujet />}
              ],
            }
          ],
        },
        {
          path: "etudiant",
          element: <ProtectedRoute roleRequired="CANDIDAT" />,
          children: [
            {
              path: "",
              element: <Etudiant />,
              children: [
                { path: "dashboard", element: <EtudiantDashboard /> }
              ],
            }
          ],
        },
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
