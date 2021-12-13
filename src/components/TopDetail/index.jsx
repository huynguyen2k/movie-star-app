// COMPONENTS
import MovieDetail from 'components/MovieDetail'
import Rating from 'components/Rating'
import PropTypes from 'prop-types'
import React from 'react'
import './style.scss'

TopDetail.propTypes = {
	movie: PropTypes.object,
}

TopDetail.defaultProps = {
	movie: null,
}

function TopDetail({ movie }) {
	if (!movie) return null
	return (
		<div className="top-detail">
			<div className="top-detail__blur-image">
				<img src={movie.hinhAnh} alt={movie.tenPhim} />
			</div>
			<div className="container top-detail__container">
				<div className="top-detail__col">
					<MovieDetail movie={movie} />
				</div>
				<div className="top-detail__col">
					<Rating
						max={10}
						score={movie.rating}
						ratingNumber={movie.ratingNumber}
					/>
				</div>
			</div>
		</div>
	)
}

export default TopDetail
