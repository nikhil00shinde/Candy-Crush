import { useEffect, useState } from "react";

import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import blank from "./images/blank.png";
import ScoreBoard from "./component/ScoreBoard";

const width = 8;
const candyColors = [
	blueCandy,
	greenCandy,
	orangeCandy,
	purpleCandy,
	redCandy,
	yellowCandy,
];

const App = () => {
	const [currColorArrangement, setCurrentColorArrangement] = useState([]);
	const [squareBeingDragged, setSquareBeingDragged] = useState(null);
	const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
	const [scoreDisplay, setScoreDisplay] = useState(0);

	// check for column of 3 and 4
	const checkForColumnOfFour = () => {
		for (let i = 0; i <= 39; i++) {
			const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
			const decidedColor = currColorArrangement[i];
			const isBlank = currColorArrangement[i] === blank;

			if (
				columnOfFour.every(
					(square) => currColorArrangement[square] === decidedColor
				) &&
				!isBlank
			) {
				setScoreDisplay((score) => score + 4);
				columnOfFour.forEach(
					(square) => (currColorArrangement[square] = blank)
				);

				return true;
			}
		}
	};

	const checkForColumnOfThree = () => {
		for (let i = 0; i <= 47; i++) {
			const columnOfThree = [i, i + width, i + width * 2];
			const decidedColor = currColorArrangement[i];
			const isBlank = currColorArrangement[i] === blank;

			if (
				columnOfThree.every(
					(square) => currColorArrangement[square] === decidedColor
				) &&
				!isBlank
			) {
				setScoreDisplay((score) => score + 3);

				columnOfThree.forEach(
					(square) => (currColorArrangement[square] = blank)
				);
				return true;
			}
		}
	};

	const checkForRowOfThree = () => {
		for (let i = 0; i < 64; i++) {
			const rowOfThree = [i, i + 1, i + 2];
			const decidedColor = currColorArrangement[i];
			const isBlank = currColorArrangement[i] === blank;

			const notValid = [
				6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
			];

			if (notValid.includes(i)) continue;
			if (
				rowOfThree.every(
					(square) => currColorArrangement[square] === decidedColor
				) &&
				!isBlank
			) {
				setScoreDisplay((score) => score + 3);

				rowOfThree.forEach((square) => (currColorArrangement[square] = blank));
				return true;
			}
		}
	};

	const checkForRowOfFour = () => {
		for (let i = 0; i < 64; i++) {
			const rowOfFour = [i, i + 1, i + 2, i + 3];
			const decidedColor = currColorArrangement[i];
			const isBlank = currColorArrangement[i] === blank;

			const notValid = [
				5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
				54, 55, 61, 62, 63,
			];

			if (notValid.includes(i)) continue;
			if (
				rowOfFour.every(
					(square) => currColorArrangement[square] === decidedColor
				) &&
				!isBlank
			) {
				setScoreDisplay((score) => score + 4);
				rowOfFour.forEach((square) => (currColorArrangement[square] = blank));
				return true;
			}
		}
	};

	const moveIntoSquareBelow = () => {
		for (let i = 0; i <= 55; i++) {
			const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

			const isFirstRow = firstRow.includes(i);

			if (isFirstRow && currColorArrangement[i] === blank) {
				let randomNumber = Math.floor(Math.random() * candyColors.length);
				currColorArrangement[i] = candyColors[randomNumber];
			}

			if (currColorArrangement[i + width] === blank) {
				currColorArrangement[i + width] = currColorArrangement[i];
				currColorArrangement[i] = blank;
			}
		}
	};

	const dragStart = (e) => {
		setSquareBeingDragged(e.target);

	};
	const dragDrop = (e) => {
		setSquareBeingReplaced(e.target);
	};
	const dragEnd = (e) => {
		const squareBeingReplacedId = parseInt(
			squareBeingReplaced.getAttribute("data-id")
		);
		const squareBeingDraggedId = parseInt(
			squareBeingDragged.getAttribute("data-id")
		);

		currColorArrangement[squareBeingReplacedId] =
			squareBeingDragged.getAttribute("src");
		currColorArrangement[squareBeingDraggedId] =
			squareBeingReplaced.getAttribute("src");

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
		} else {
			currColorArrangement[squareBeingReplacedId] =
				squareBeingReplaced.getAttribute("src");
			currColorArrangement[squareBeingDraggedId] =
				squareBeingDragged.getAttribute("src");
			setCurrentColorArrangement([...currColorArrangement]);
		}
		e.preventDefault();
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
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, [currColorArrangement]);

	return (
		<>
			<div className="app">
				<div className="game">
					{currColorArrangement.map((candyColor, index) => {
						return (
							<img
								key={index}
								src={candyColor}
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
				<ScoreBoard score={scoreDisplay} />
			</div>
		</>
	);
};

export default App;
