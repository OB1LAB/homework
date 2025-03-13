"use client"
import {useEffect, useState} from "react";

const FirstTask = () => {
	const [answer, setAnswer] = useState(0)

	const getSummary = () => {
		let sum = 0;
		for (const i of Array(1000000).keys()) {
			if ((i + 1) % 7 === 0) {
				sum += i + 1
			}
		}
		setAnswer(sum)
	}
	useEffect(() => {
		getSummary()
	}, []);
	return <div>
		<div>Задание 1 (Вывести сумму чисел, которое делится на 7)</div>
		<div className="underAbout">Ответ: {answer}</div>
	</div>
}

export default FirstTask
