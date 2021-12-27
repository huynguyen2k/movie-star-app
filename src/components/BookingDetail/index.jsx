import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Typography } from '@material-ui/core'
import useStyles from './styles'

BookingDetail.propTypes = {
	movieDetail: PropTypes.object,
	bookingList: PropTypes.array,
	onBookingTicket: PropTypes.func,
}

BookingDetail.defaultProps = {
	movieDetail: {},
	bookingList: [],
	onBookingTicket: null,
}

function BookingDetail(props) {
	const { bookingList, movieDetail, onBookingTicket } = props
	const classes = useStyles()

	const convertNumberToSeatNumber = ticket => {
		if (!ticket) return ''

		const index = parseInt(ticket.stt) - 1
		const row = String.fromCharCode(65 + parseInt(index / 16))
		const number = (index % 16) + 1

		return `${row}${number}`
	}

	const convertNumberToVND = number => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(Number(number))
	}

	const totalPrice = () => {
		if (!Array.isArray(bookingList)) return convertNumberToVND(0)

		const total = bookingList.reduce(
			(total, ticket) => total + Number(ticket.giaVe),
			0
		)
		return convertNumberToVND(total)
	}

	const handleBookingTicket = () => {
		if (onBookingTicket) {
			onBookingTicket()
		}
	}

	if (!movieDetail) return null
	return (
		<Box className={classes.rootBox}>
			<Box className={classes.row}>
				<Typography className={classes.movieName} component="h3">
					{movieDetail.tenPhim}
				</Typography>
			</Box>

			<Box className={classes.row}>
				<Typography className="label" component="span">
					Ngày chiếu
				</Typography>

				<Box className="content">
					<Typography component="span">{movieDetail.ngayChieu}</Typography>
					<Typography component="span" className={classes.showtime}>
						{movieDetail.gioChieu}
					</Typography>
				</Box>
			</Box>

			<Box className={classes.row}>
				<Typography className="label" component="span">
					Cụm rạp
				</Typography>

				<Box className="content">
					<Typography component="span">{movieDetail.tenCumRap}</Typography>
				</Box>
			</Box>

			<Box className={classes.row}>
				<Typography className="label" component="span">
					Rạp
				</Typography>

				<Box className="content">
					<Typography component="span">{movieDetail.tenRap}</Typography>
				</Box>
			</Box>

			<Box className={classes.row}>
				<Typography className="label" component="span">
					Ghế chọn
				</Typography>

				<Box className="content booking-list">
					{bookingList.map(ticket => (
						<Typography key={ticket.maGhe} component="h4">
							{`${convertNumberToSeatNumber(ticket)} - ${convertNumberToVND(
								ticket.giaVe
							)}`}
						</Typography>
					))}
				</Box>
			</Box>

			<Box className={classes.row}>
				<Typography className="label" component="span">
					Tổng tiền
				</Typography>

				<Box className="content">
					<Typography className={classes.totalPrice} component="span">
						{totalPrice()}
					</Typography>
				</Box>
			</Box>

			<Button
				fullWidth
				disableRipple
				variant="contained"
				size="large"
				className={classes.bookingTicketBtn}
				disabled={bookingList.length === 0}
				onClick={handleBookingTicket}
			>
				Đặt Vé
			</Button>
		</Box>
	)
}

export default BookingDetail
