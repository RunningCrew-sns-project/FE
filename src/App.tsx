import { Outlet } from "react-router";
import Footer from "./components/Layout/footer";
import Header from "./components/Layout/header";
import toast, { Toaster } from 'react-hot-toast';


function App() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<div>
				<Toaster />
			</div>
		</>
	);
}

export default App;
