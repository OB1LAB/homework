"use client"
import styles from "./SecondTask.module.scss"
import {useState} from "react";

const SecondTask = () => {
	const [seconds, setSeconds] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [hours, setHours] = useState(0)
	return <div>
		<div>Задание 2 (Вывести текущее время)</div>
		<div className="underAbout">
			<div className={styles.time}>
			<div className={styles.hours}></div>
			<div className={styles.minutes}></div>
			<div className={styles.seconds}></div></div>
		</div>
	</div>
}

export default SecondTask
