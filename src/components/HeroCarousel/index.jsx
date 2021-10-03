import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import Modal from 'components/Modal'
import Slider from 'react-slick'
import HeroSlide from 'components/HeroSlide'

HeroCarousel.propTypes = {
	movieList: PropTypes.array,
}

HeroCarousel.defaultProps = {
	movieList: [],
}

const settings = {
	fade: true,
	speed: 750,
	autoplay: true,
	autoplaySpeed: 7000,
	pauseOnHover: false,
	dots: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	customPaging: () => <div className="custom-dot" />,
}

function HeroCarousel({ movieList }) {
	const [showModal, setShowModal] = useState(false)
	const [trailer, setTrailer] = useState('')

	function handlePlayTrailer(movie) {
		setTrailer(movie.trailer)
		setShowModal(true)
	}

	return (
		<div className="hero-carousel">
			<Slider {...settings}>
				{movieList.map((movie, index) => {
					return (
						<HeroSlide
							key={index}
							movie={movie}
							onPlayTrailer={handlePlayTrailer}
						/>
					)
				})}
			</Slider>
			{showModal && (
				<Modal onCloseModal={() => setShowModal(false)}>
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

export default HeroCarousel
