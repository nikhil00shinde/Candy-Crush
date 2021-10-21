import { useEffect, useState } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
	const [currColorArrangement, setCurrentColorArrangement] = useState([]);

	const createBoard = () => {
		const randomColorArrangement = [];
		for (let i = 0; i < width * width; i++) {
			const randomColor =
				candyColors[Math.floor(Math.random() * candyColors.length)];
			randomColorArrangement.push(randomColor);
		}
		setCurrentColorArrangement(randomColorArrangement);
	};

	useEffect(() => {
		createBoard();
	}, []);

	return (
		<div className="app">
			<div className="game">
				{currColorArrangement.map((candyColor, index) => {
					return (
						<img key={index} style={{ backgroundColor: candyColor }} alt={candyColor}/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
