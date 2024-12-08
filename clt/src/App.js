import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home1 from "./pages/Home1";
import "./assets/css/style.css";
import Userh from "./pages/userh";
import SingleU from "./pages/SingleU";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home1 />,
      },
      {
        path: "/h",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      
    ],
    
  },
  {
  path: "/userh",
  element: <Userh />,
},
{
  path: "/singleu/:id",
  element: <SingleU />,
},
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div >
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
