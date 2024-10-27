import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import RunListPage from "../pages/Runlist";
import Errorpage from "../pages/errorPage";
import App from "../App";
import Login from "../pages/Auth/Login";
import MyPage from "../pages/MyPage";
import Create from "../pages/Run";
import Run from "../pages/Run/create/createRun";
import CrewRun from "../pages/Run/create/createCrewRun";
import Crew from "../pages/Run/create/createCrew";
import Running from "../pages/Runlist/running";

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
				path: "create",
				element: <Create/>,
				children : [
					{
						path: 'run',
						element: <Run/>
					},
					{
						path: 'crewRun',
						element: <CrewRun/>
					},
					{
						path: 'crew',
						element: <Crew/>
					}
				],
			},
			{
				path: 'running',
				element : <Running/>
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
