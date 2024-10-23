import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import RunListPage from "../pages/Runlist";
import Errorpage from "../pages/errorPage";
import App from "../App";
import Login from "../pages/Auth/Login";
import MyPage from "../pages/MyPage";

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
			{
				path: "myPage",
				element: <MyPage />,
			},
		],
		errorElement: <Errorpage />,
	},
]);

export default router;
