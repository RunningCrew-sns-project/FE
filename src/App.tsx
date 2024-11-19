import { Outlet, useLocation } from "react-router";
import Header from "./components/Layout/header";
import { Toaster } from "react-hot-toast";
import { useDevice } from "./hook/usedevice";
import Alarm from "./components/Alarm";

function App() {
	const location = useLocation();
	const { isMobile, isTablet } = useDevice();

	const isRunning = location.pathname === "/running";
	const hideHeaderFooter = isRunning && (isMobile || isTablet);
	return (
		<>
			<Alarm />
			{!hideHeaderFooter && <Header />}
			{!hideHeaderFooter && <div className="h-[60px]"></div>}
			<Outlet />
			<div>
				<Toaster />
			</div>
		</>
	);
}

export default App;
