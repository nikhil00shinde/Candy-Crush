import { useEffect, useState } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
	const [currColorArrangement, setCurrentColorArrangement] = useState([]);
	const [squareBeingDragged, setSquareBeingDragged] = useState(null);
	const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

	// check for column of 3 and 4
	const checkForColumnOfFour = () => {
		for (let i = 0; i <= 39; i++) {
			const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
			const decidedColor = currColorArrangement[i];

			if (
				columnOfFour.every(
					(square) => currColorArrangement[square] === decidedColor
				)
			) {
				columnOfFour.forEach((square) => (currColorArrangement[square] = ""));
				return true;
			}
		}
	};

	const checkForColumnOfThree = () => {
		for (let i = 0; i <= 47; i++) {
			const columnOfThree = [i, i + width, i + width * 2];
			const decidedColor = currColorArrangement[i];

			if (
				columnOfThree.every(
					(square) => currColorArrangement[square] === decidedColor
				)
			) {
				columnOfThree.forEach((square) => (currColorArrangement[square] = ""));
				return true;
			}
		}
	};

	const checkForRowOfThree = () => {
		for (let i = 0; i < 64; i++) {
			const rowOfThree = [i, i + 1, i + 2];
			const decidedColor = currColorArrangement[i];

			const notValid = [
				6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
			];

			if (notValid.includes(i)) continue;
			if (
				rowOfThree.every(
					(square) => currColorArrangement[square] === decidedColor
				)
			) {
				rowOfThree.forEach((square) => (currColorArrangement[square] = ""));
				return true;
			}
		}
	};

	const checkForRowOfFour = () => {
		for (let i = 0; i < 64; i++) {
			const rowOfFour = [i, i + 1, i + 2, i + 3];
			const decidedColor = currColorArrangement[i];

			const notValid = [
				5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
				54, 55, 61, 62, 63,
			];

			if (notValid.includes(i)) continue;
			if (
				rowOfFour.every(
					(square) => currColorArrangement[square] === decidedColor
				)
			) {
				rowOfFour.forEach((square) => (currColorArrangement[square] = ""));
				return true;
			}
		}
	};

	const moveIntoSquareBelow = () => {
		for (let i = 0; i <= 55; i++) {
			const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

			const isFirstRow = firstRow.includes(i);

			if (isFirstRow && currColorArrangement[i] === "") {
				let randomNumber = Math.floor(Math.random() * candyColors.length);
				currColorArrangement[i] = candyColors[randomNumber];
			}

			if (currColorArrangement[i + width] === "") {
				currColorArrangement[i + width] = currColorArrangement[i];
				currColorArrangement[i] = "";
			}
		}
	};

	const dragStart = (e) => {
		// console.log(e.target);
		console.log("drag start");
		setSquareBeingDragged(e.target);
	};
	const dragDrop = (e) => {
		// console.log(e.target);
		console.log("drag drop");
		setSquareBeingReplaced(e.target);
	};
	const dragEnd = (e) => {
		console.log("drag end");

		const squareBeingReplacedId = parseInt(
			squareBeingReplaced.getAttribute("data-id")
		);
		const squareBeingDraggedId = parseInt(
			squareBeingDragged.getAttribute("data-id")
		);

		currColorArrangement[squareBeingReplacedId] =
			squareBeingDragged.style.backgroundColor;
		currColorArrangement[squareBeingDraggedId] =
			squareBeingReplaced.style.backgroundColor;

		const validMoves = [
			squareBeingDraggedId - 1,
			squareBeingDraggedId - width,
			squareBeingDraggedId + 1,
			squareBeingDraggedId + width,
		];

		const validMove = validMoves.includes(squareBeingReplacedId);


		const isAColumnOfFour = checkForColumnOfFour();
		const isAColumnOfThree = checkForColumnOfThree();
		const isARowOfFour = checkForRowOfFour();
		const isARowOfThree = checkForRowOfThree();

		if (
			squareBeingReplacedId &&
			validMove &&
			(isAColumnOfThree || isAColumnOfFour || isARowOfFour || isARowOfThree)
		) {
			setSquareBeingDragged(null);
			setSquareBeingReplaced(null);
			console.log(1);
		} else {
			currColorArrangement[squareBeingReplacedId] =
				squareBeingReplaced.style.backgroundColor;
			currColorArrangement[squareBeingDraggedId] =
				squareBeingDragged.style.backgroundColor;
			setCurrentColorArrangement([...currColorArrangement]);
			console.log(2);
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
		const timer = setInterval(() => {
			checkForColumnOfFour();
			checkForColumnOfThree();
			checkForRowOfThree();
			checkForRowOfFour();
			moveIntoSquareBelow();
			setCurrentColorArrangement([...currColorArrangement]);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [currColorArrangement]);

	return (
		<div className="app">
			<div className="game">
				{currColorArrangement.map((candyColor, index) => {
					return (
						<img
							key={index}
							style={{ backgroundColor: candyColor }}
							alt={candyColor}
							data-id={index}
							draggable="true"
							onDragStart={dragStart}
							onDragOver={(e) => e.preventDefault()}
							onDragEnter={(e) => e.preventDefault()}
							onDragLeave={(e) => e.preventDefault()}
							onDrop={dragDrop}
							onDragEnd={dragEnd}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
