import { Outlet } from "react-router";
import Footer from "./components/Layout/footer";
import Header from "./components/Layout/header";


function App() {
	return (
		<>
      <Header/>
        <Outlet/>
      <Footer/>
		</>
	);
}

export default App;
