import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

CircleRating.propTypes = {
	score: PropTypes.number,
	max: PropTypes.number,
}

CircleRating.defaultProps = {
	score: 10,
	max: 10,
}

function CircleRating({ score, max }) {
	const c = 2 * Math.PI * 60
	const circleStyles = {
		strokeDasharray: `${c}px`,
		strokeDashoffset: 0,
	}
	const activeCircleStyles = {
		strokeDasharray: `${c}px`,
		strokeDashoffset: `${c - (score / max) * c}px`,
	}

	return (
		<div className="circle-rating">
			<svg>
				<circle cx="50%" cy="50%" r="60" style={circleStyles}></circle>
				<circle cx="50%" cy="50%" r="60" style={activeCircleStyles}></circle>
			</svg>
			<span className="content">{score.toFixed(1)}</span>
		</div>
	)
}

export default CircleRating
