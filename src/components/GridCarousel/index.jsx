import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// ICONS
import ArrowPrevIcon from '@material-ui/icons/NavigateBefore'
import ArrowNextIcon from '@material-ui/icons/NavigateNext'
// COMPONENTS
import Slider from 'react-slick'
import MovieCard from 'components/MovieCard'
import Modal from 'components/Modal'

function PrevArrow(props) {
	const { className, style, onClick } = props
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<ArrowPrevIcon />
		</div>
	)
}

function NextArrow(props) {
	const { className, style, onClick } = props
	return (
		<div className={className} style={{ ...style }} onClick={onClick}>
			<ArrowNextIcon />
		</div>
	)
}

function CustomSlide({ movie, onPlayTrailer, ...props }) {
	return (
		<div className="custom-slide" {...props}>
			<MovieCard movie={movie} onPlayTrailer={onPlayTrailer} />
		</div>
	)
}

GridCarousel.propTypes = {
	movieList: PropTypes.array,
}

GridCarousel.defaultProps = {
	movieList: [],
}

const settings = {
	speed: 500,
	dots: false,
	infinite: true,
	rows: 2,
	slidesPerRow: 1,
	slidesToShow: 4,
	slidesToScroll: 4,
	prevArrow: <PrevArrow />,
	nextArrow: <NextArrow />,
}

function GridCarousel({ movieList }) {
	const [trailer, setTrailer] = useState('')
	const [trailerModal, setTrailerModal] = useState(false)

	function handlePlayTrailer(movie) {
		setTrailer(movie.trailer)
		setTrailerModal(true)
	}

	return (
		<div className="grid-carousel">
			<div className="grid-carousel__wrap">
				<Slider {...settings}>
					{movieList.map(movie => (
						<CustomSlide
							key={movie.maPhim}
							movie={movie}
							onPlayTrailer={handlePlayTrailer}
						/>
					))}
				</Slider>
			</div>
			{trailerModal && (
				<Modal onCloseModal={() => setTrailerModal(false)}>
					<iframe
						width="956"
						height="538"
						src={trailer}
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

export default GridCarousel
