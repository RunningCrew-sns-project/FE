import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "../pages/Main/index";
import RunListPage from "../pages/Runlist/index";
import Errorpage from "../pages/errorPage";
import App from "../App";
import Login from "../pages/Auth/Login";
import Create from "../pages/Run";
import Run from "../pages/Run/create/createRun";
import CrewRun from "../pages/Run/create/createCrewRun";
import Crew from "../pages/Run/create/createCrew";
import Running from "../pages/Runlist/running";
import MyPage from "../pages/MyPage/index";
import MyCrew from "../pages/MyPage/MyCrew";
import MyRunning from "../pages/MyPage/MyRunning";
import MyFeed from "../pages/MyPage/MyFeed";
import Profile from "../pages/MyPage/Profile";
import Blog from "../pages/Blog/Blog";
import WriteBlogCard from "../pages/Blog/WriteBlogCard";
import BlogDetail from "../pages/Blog/BlogDetail";
import JoinRundetail from "../pages/Detailpage/JoinRundetail";
import JoinCrewrundetail from "../pages/Detailpage/JoinCrewRundetail";
import JoinCrewdetail from "../pages/Detailpage/JoinCrewdetail";
import KakaoCallback from "../pages/Auth/KakaoCallback";

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
				element: <Create />,
				children: [
					{
						path: "run",
						element: <Run />,
					},
					{
						path: "crewRun",
						element: <CrewRun />,
					},
					{
						path: "crew",
						element: <Crew />,
					},
				],
			},
			{
				path: "running",
				element: <Running />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "auth/kakao/callback",
				element: <KakaoCallback />,
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
				path: "profile",
				element: <Profile />,
			},
			{
				path: "blog",
				element: <Blog />,
			},
			{
				path: "writeBlogCard",
				element: <WriteBlogCard />,
			},
			{
				path: "blog/:id",
				element: <BlogDetail />,
			},
			{
				path: "joinRun/:id",
				element: <JoinRundetail />,
			},
			{
				path: "joinCrewRun/:id",
				element: <JoinCrewrundetail />,
			},
			{
				path: "joinCrew/:id",
				element: <JoinCrewdetail />,
			},
		],
		errorElement: <Errorpage />,
	},
]);

export default router;
