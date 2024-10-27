import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "../pages/Main/index";
import RunListPage from "../pages/Runlist/index";
import Errorpage from "../pages/errorPage";
import App from "../App";
import Login from "../pages/Auth/Login";
import MyPage from "../pages/MyPage/index";
import MyCrew from "../pages/MyPage/MyCrew";
import MyRunning from "../pages/MyPage/MyRunning";
import MyFeed from "../pages/MyPage/MyFeed";
import Blog from "../pages/Blog/Blog";
import WriteBlogCard from "../pages/Blog/WriteBlogCard";
import BlogDetail from "../pages/Blog/BlogDetail";

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
				children: [
					{
						index: true,
						element: <Navigate to="myRunning" replace />,
					},
					{ path: "myCrew", element: <MyCrew /> },
					{ path: "myRunning", element: <MyRunning /> },
					{ path: "myFeed", element: <MyFeed /> },
				],
			},
			{
				path: 'blog',
				element: <Blog />
			},
			{
				path: 'writeBlogCard',
				element: <WriteBlogCard />
			},
			{
				path: 'blog/:id',
				element: <BlogDetail />
			}
		],
		errorElement: <Errorpage />,
	},
]);

export default router;
