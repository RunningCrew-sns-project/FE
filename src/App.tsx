import { Outlet, useLocation } from "react-router";
import Footer from "./components/Layout/footer";
import Header from "./components/Layout/header";
import { Toaster } from "react-hot-toast";
import { useDevice } from "./hook/usedevice";

function App() {
	const location = useLocation();
	const { isMobile, isTablet } = useDevice();

	const isRunning = location.pathname === "/running";
	const hideHeaderFooter = isRunning && (isMobile || isTablet);
	return (
		<>
			{!hideHeaderFooter && <Header />}
			<Outlet />
			{!hideHeaderFooter && <Footer />}
			<div>
				<Toaster />
			</div>
		</>
	);
}

export default App;
