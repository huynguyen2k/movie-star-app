import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import moment from 'moment'
// ICONS
import StarIcon from '@material-ui/icons/GradeRounded'
import PlayIcon from '@material-ui/icons/PlayArrow'
// COMPONENTS
import MovieImage from 'components/MovieImage'

MovieCard.propTypes = {
	movie: PropTypes.object,
	onPlayTrailer: PropTypes.func,
}

MovieCard.defaultProps = {
	movie: null,
	onPlayTrailer: () => {},
}

function MovieCard({ movie, onPlayTrailer }) {
	function renderStarList() {
		if (!movie) return

		const result = []
		const starsNumber = Math.trunc(movie.danhGia / 2)

		for (let i = 0; i < starsNumber; i++) {
			result.push(<StarIcon key={i} />)
		}
		return result
	}

	if (!movie) return null
	return (
		<div className="movie-card">
			<div className="movie-card__image" onClick={() => onPlayTrailer(movie)}>
				<MovieImage movieUrl={movie.hinhAnh} movieAlt={movie.tenPhim} />
				<div className="movie-card__view-trailer">
					<i className="view-trailer-icon">
						<PlayIcon />
					</i>
					<p className="text">Xem trailer</p>
					<p className="text">
						{`Khởi chiếu: ${moment(
							movie.ngayKhoiChieu,
							'YYYY/MM/DD',
							false
						).format('DD/MM/YYYY')}`}
					</p>
				</div>
				<div className="movie-card__rating">
					<span className="score">{movie.danhGia}</span>
					<div className="stars">{renderStarList()}</div>
				</div>
			</div>
			<div className="movie-card__info">
				<h3 className="name">{movie.tenPhim}</h3>
				<button className="buy-ticket-btn">Mua vé</button>
			</div>
		</div>
	)
}

export default MovieCard
