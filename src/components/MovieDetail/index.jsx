import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import moment from 'moment'
// COMPONENTS
import Modal from 'components/Modal'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'
import MovieImage from 'components/MovieImage'

MovieDetail.propTypes = {
	movie: PropTypes.object,
}

MovieDetail.defaultProps = {
	movie: null,
}

function MovieDetail({ movie }) {
	const [modal, setModal] = useState(false)

	if (!movie) return null
	return (
		<div className="movie-detail">
			<div className="movie-detail__banner">
				<MovieImage movieUrl={movie.hinhAnh} movieAlt={movie.tenPhim} />
				<span className="play-icon" onClick={() => setModal(true)}>
					<PlayIcon />
				</span>
			</div>
			<div className="movie-detail__info">
				<h3 className="date">
					{moment(movie.ngayKhoiChieu, 'YYYY/MM/DD', false).format(
						'DD.MM.YYYY'
					)}
				</h3>
				<h3 className="movie-name">
					<span className="badge">{movie.tuoi}</span>
					<span className="text">{movie.tenPhim}</span>
				</h3>
				<h3 className="duration">{`${movie.thoiLuong} phút - ${movie.rating} IMDb - 2D/Digital`}</h3>
				<span className="buy-ticket-btn">Mua vé</span>
			</div>
			{modal && (
				<Modal onCloseModal={() => setModal(false)}>
					<iframe
						width="956"
						height="538"
						src={movie.trailer}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</Modal>
			)}
		</div>
	)
}

export default MovieDetail
