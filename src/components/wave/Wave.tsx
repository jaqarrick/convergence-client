import "./Wave.css"
import React, { useCallback, useEffect, useRef } from "react"
// import s from "../../util/visual/sketch"
import p5 from "p5"

let canvasWidth = 1000
let amplitude = 1

const s = (sketch: any) => {
	let xspacing = 1 // Distance between each horizontal location
	let w // Width of entire wave
	let theta = 0.1 // Start angle at 0
	// let amplitude = 0 // Height of wave
	let period = canvasWidth // How many pixels before the wave repeats
	let dx: any // Value for incrementing x
	let yvalues: any // Using an array to store height values for the wave

	sketch.setup = () => {
		sketch.createCanvas(canvasWidth, 400) // constants for window height and width? resize(){}
		w = sketch.width + 16
		dx = (sketch.TWO_PI / period) * xspacing
		yvalues = new Array(Math.floor(w / xspacing))
	}

	const renderWave = () => {
		sketch.noStroke()
		sketch.fill(0, 0, 0)
		// A simple way to draw the wave with an ellipse at each location
		for (let x = 0; x < yvalues.length; x++) {
			// ellipse(x * xspacing, height / 2 + yvalues[x], 2, 2)
			// stroke(10)
			sketch.ellipse(x * xspacing, sketch.height / 2 + yvalues[x], 5, 5)
		}
	}

	const calcWave = () => {
		// Increment theta (try different values for
		// 'angular velocity' here)
		theta += 0.1

		// For every x value, calculate a y value with sine function
		let x = theta
		for (let i = 0; i < yvalues.length; i++) {
			yvalues[i] = sketch.sin(x) * amplitude
			x += dx
		}
	}
	sketch.draw = () => {
		sketch.background(255)
		calcWave()
		renderWave()
	}
}

interface Props {
	numberOfPeers: number
	userAmpVal: number
}

const Wave: React.FC<Props> = ({ numberOfPeers, userAmpVal }) => {
	const requestRef = useRef<number>(0)
	const waveRef = useRef<HTMLDivElement | null>(null)
	const animate = useCallback(() => {
		requestRef.current = requestAnimationFrame(animate)
	}, [])

	useEffect(() => {
		amplitude = userAmpVal
	}, [userAmpVal])
	useEffect(() => {
		if (waveRef.current) {
			canvasWidth = window.innerWidth

			new p5(s, waveRef.current)
			console.log("sketch created")
		}
	}, [])

	return (
		<div className='wave-container'>
			<div ref={waveRef}></div>
		</div>
	)
}

export default Wave
