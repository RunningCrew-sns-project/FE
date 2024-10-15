import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import RunListPage from "../pages/Runlist";
import Errorpage from "../pages/errorPage";
import App from "../App";

const router = createBrowserRouter([
	{
    element : <App/>,
    children: [
      {
        path : '/',
        element: <MainPage/>
      },
      {
        path : 'runList',
        element  : <RunListPage/>
      }
    ],
		errorElement: <Errorpage />,
	},
]);

export default router;
