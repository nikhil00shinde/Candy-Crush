import { useEffect, useState } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
	const [currColorArrangement, setCurrentColorArrangement] = useState([]);

	// check for column of 3 and 4
	const checkForColumnOfFour = () => {
		for (let i = 0; i < 39; i++) {
			const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
			const decidedColor = currColorArrangement[i];

			if (
				columnOfFour.every(
					(square) => currColorArrangement[square] === decidedColor
				)
			) {
				columnOfFour.forEach((square) => (currColorArrangement[square] = ""));
			}
		}
	};
	
	const checkForColumnOfThree = () => {
		for (let i = 0; i < 47; i++) {
			const columnOfThree = [i, i + width, i + width * 2];
			const decidedColor = currColorArrangement[i];

			if (
				columnOfThree.every(
					(square) => currColorArrangement[square] === decidedColor
				)
			) {
				columnOfThree.forEach((square) => (currColorArrangement[square] = ""));
			}
		}
	};

	// random color array
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

	useEffect(() => {
		console.log(1);
		const timer = setInterval(() => {
			console.log(2);
			checkForColumnOfFour();
			checkForColumnOfThree();
			setCurrentColorArrangement([...currColorArrangement]);
		}, 1000);

		return () => {
			console.log(3);
			clearInterval(timer);
		};
	}, [checkForColumnOfFour, checkForColumnOfThree, currColorArrangement]);

	return (
		<div className="app">
			<div className="game">
				{currColorArrangement.map((candyColor, index) => {
					return (
						<img
							key={index}
							style={{ backgroundColor: candyColor }}
							alt={candyColor}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
