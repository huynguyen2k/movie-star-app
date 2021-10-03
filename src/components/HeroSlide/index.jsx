import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// ICONS
import PlayIcon from '@material-ui/icons/PlayArrow'

HeroSlide.propTypes = {
	movie: PropTypes.object,
	onPlayTrailer: PropTypes.func,
}

HeroSlide.defaultProps = {
	movie: null,
	onPlayTrailer: () => {},
}

function HeroSlide({ movie, onPlayTrailer, ...props }) {
	return (
		movie && (
			<div className="hero-slide" {...props}>
				<div className="container hero-slide__container">
					<div className="hero-slide__info">
						<h3 className="type">{movie.type}</h3>
						<h3 className="name">{movie.name}</h3>
						<p className="description">{movie.description}</p>
						<button
							className="play-trailer-btn"
							onClick={() => onPlayTrailer(movie)}
						>
							<PlayIcon />
							<span>PLAY TRAILER</span>
						</button>
					</div>
				</div>
				<img className="hero-slide__image" src={movie.image} alt="Slide" />
			</div>
		)
	)
}

export default HeroSlide
