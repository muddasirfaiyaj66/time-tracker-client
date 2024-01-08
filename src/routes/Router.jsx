import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage";
import Register from "../Pages/Register/Register";

export  const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                index:true,
                element: <Home></Home>
            }
        ]
    },
    {path:'/login', element: <Login></Login>},
    {path:'/register', element: <Register></Register>}
]);