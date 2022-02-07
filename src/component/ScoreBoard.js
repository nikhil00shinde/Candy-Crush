import React from "react";

export default function ScoreBoard({ score }) {
	return (
		<div className="score-board">
			<h1>Candy Crush</h1>
			<h1>Score {score}</h1>
		</div>
	);
}
