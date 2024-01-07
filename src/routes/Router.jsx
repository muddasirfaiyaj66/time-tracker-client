import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layouts/Main";

export  const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index:true,
                element: <div>Hello World</div>
            }
        ]
    },
]);