import {
    createBrowserRouter
} from "react-router-dom";

export  const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index:true,
                element: <div>Hello World</div>
            }
        ]
    },
]);