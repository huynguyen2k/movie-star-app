import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import './style.scss'
import PropTypes from 'prop-types'
import moment from 'moment'
// COMPONENTS
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MovieImage from 'components/MovieImage'

const useStyles = makeStyles({
	root: {
		boxShadow: '0 0 2px 0 gray',
	},
})

MovieAccordion.propTypes = {
	movieList: PropTypes.array,
}

MovieAccordion.defaultProps = {
	movieList: [],
}

function MovieAccordion({ movieList }) {
	const classes = useStyles()
	const [expanded, setExpanded] = useState(false)

	const handleChange = panel => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false)
	}

	return (
		<div className="movie-accordion">
			{movieList.map(movie => (
				<Accordion
					key={movie.maPhim}
					expanded={expanded === movie.maPhim}
					onChange={handleChange(movie.maPhim)}
					classes={{
						root: classes.root,
					}}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<div className="movie-accordion__movie-item">
							<div className="image">
								<MovieImage movieUrl={movie.hinhAnh} movieAlt={movie.tenPhim} />
							</div>
							<div className="info">
								<h3 className="movie-name">{movie.tenPhim}</h3>
								<div className="show-time">120 phút - 9.0 IMDb</div>
							</div>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<ul className="movie-accordion__show-times-list">
							{movie.lstLichChieuTheoPhim.slice(0, 6).map(item => (
								<li
									key={item.maLichChieu}
									className="movie-accordion__show-times-item"
								>
									Giờ chiếu:{' '}
									{`${moment(
										item.ngayChieuGioChieu,
										'YYYY/MM/DD hh:mm:ss',
										false
									).format('DD/MM/YYYY - HH:mm')}`}
									, Giá vé: {item.giaVe} VNĐ
								</li>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	)
}

export default MovieAccordion
