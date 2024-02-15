import { Card } from "react-bootstrap";
import { Home } from "./components/Home";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import { Article } from "./components/Article";

function App() {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:articleId" element={<Article />} />
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</main>
			<footer></footer>
		</>
	);
}

export default App;
