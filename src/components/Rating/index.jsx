import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import CircleRating from 'components/CircleRating'
import StarIcon from '@material-ui/icons/Star'
import { Rating as MuiRating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	rating: {
		color: 'var(--primary-color)',

		'& .MuiRating-iconEmpty': {
			color: theme.palette.grey[400],
		},
	},
}))

Rating.propTypes = {
	score: PropTypes.number,
	max: PropTypes.number,
	ratingNumber: PropTypes.number,
}

Rating.defaultProps = {
	score: 10,
	max: 10,
	ratingNumber: 0,
}

function Rating({ score, max, ratingNumber }) {
	const classes = useStyles()

	return (
		<div className="rating">
			<CircleRating score={score} max={max} />

			<div className="rating__stars">
				<MuiRating
					readOnly
					size="medium"
					name="rating-movie"
					max={5}
					precision={0.5}
					value={score / 2}
					icon={<StarIcon fontSize="inherit" />}
					className={classes.rating}
				/>
			</div>

			<h4 className="rating__number">{ratingNumber} đánh giá</h4>
		</div>
	)
}

export default Rating
