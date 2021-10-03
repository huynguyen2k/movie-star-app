import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

MovieImage.propTypes = {
	movieUrl: PropTypes.string.isRequired,
	movieAlt: PropTypes.string.isRequired,
}

function MovieImage({ movieUrl, movieAlt }) {
	return (
		<img
			src={movieUrl}
			alt={movieAlt}
			onError={e => (e.target.src = 'assets/images/error-image.jpg')}
		/>
	)
}

export default MovieImage
