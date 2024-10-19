import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import RunListPage from "../pages/Runlist";
import Errorpage from "../pages/errorPage";
import App from "../App";
import Login from "../pages/Auth/Login";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <MainPage />,
			},
			{
				path: "runList",
				element: <RunListPage />,
			},
			{
				path: "Login",
				element: <Login />,
			},
		],
		errorElement: <Errorpage />,
	},
]);

export default router;
