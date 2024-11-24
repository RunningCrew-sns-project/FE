import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	let isAuthenticated = false;

	const userState = JSON.parse(localStorage.getItem("auth-storage") || "{}");
	const isLoggedIn = userState.state.isLoggedIn;
	isAuthenticated = isLoggedIn;

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	// 로그인한 경우 자식 라우트를 렌더링
	return <Outlet />;
};

export default PrivateRoute;
