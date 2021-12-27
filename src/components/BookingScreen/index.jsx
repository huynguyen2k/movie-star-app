import { Box, Button, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/CloseRounded'
import classNames from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import useStyles from './styles'

BookingScreen.propTypes = {
	movieDetail: PropTypes.object,
	ticketList: PropTypes.array,
	bookingList: PropTypes.array,
	onSelectTicket: PropTypes.func,
	holdingTimes: PropTypes.number,
	onTimeout: PropTypes.func,
}

BookingScreen.defaultProps = {
	movieDetail: null,
	ticketList: [],
	bookingList: [],
	onSelectTicket: null,
	holdingTimes: 300,
	onTimeout: null,
}

function BookingScreen(props) {
	const {
		movieDetail,
		ticketList,
		bookingList,
		onSelectTicket,
		holdingTimes,
		onTimeout,
	} = props
	const classes = useStyles()
	const [seconds, setSeconds] = useState(holdingTimes)

	useEffect(() => {
		if (seconds > 0) {
			const timeoutId = setTimeout(
				() => setSeconds(prevSeconds => prevSeconds - 1),
				1000
			)
			return () => {
				clearTimeout(timeoutId)
			}
		}

		if (onTimeout) {
			onTimeout()
		}
	}, [seconds, onTimeout])

	const handleSelectTicket = ticket => {
		if (onSelectTicket) {
			onSelectTicket({
				maGhe: ticket.maGhe,
				giaVe: ticket.giaVe,
				stt: ticket.stt,
			})
		}
	}

	const isBookingTicket = ticket => {
		if (!ticket) return

		const { maGhe } = ticket
		const index = bookingList.findIndex(ticket => ticket.maGhe === maGhe)
		return index >= 0
	}

	const convertNumberToSeatNumber = ticket => {
		if (!ticket) return ''

		const index = parseInt(ticket.stt) - 1
		const row = String.fromCharCode(65 + parseInt(index / 16))
		const number = (index % 16) + 1

		return `${row}${number}`
	}

	if (!movieDetail) return null
	return (
		<Box className={classes.rootBox}>
			<Box className={classes.topDetail}>
				<Box className={classes.cinemaInfoBox}>
					<img
						className="movie-img"
						src={movieDetail.hinhAnh}
						alt={movieDetail.tenPhim}
					/>

					<Box className="cinema-info">
						<Typography className="name" component="h3">
							<Typography className="strong-name" component="span">
								{movieDetail.tenCumRap?.split(' - ')[0]}
							</Typography>

							<Typography className="dash-character" component="span">
								-
							</Typography>

							<Typography component="span">
								{movieDetail.tenCumRap?.split(' - ')[1]}
							</Typography>

							<Typography className="dash-character" component="span">
								-
							</Typography>

							<Typography component="span">{movieDetail.tenRap}</Typography>
						</Typography>

						<Typography className="address" component="span">
							{movieDetail.diaChi}
						</Typography>
					</Box>
				</Box>

				<Box className={classes.holdingTimes}>
					<Typography className="title" component="span">
						Thời gian giữ ghế
					</Typography>

					<Typography className="content" component="span">
						{moment.utc(seconds * 1000).format('mm:ss')}
					</Typography>
				</Box>
			</Box>

			<Box className={classes.screenLine} />

			<Box className={classes.bookingBox}>
				<Box className={classes.ticketList}>
					{ticketList.map((ticket, index) => {
						return (
							<Fragment key={ticket.maGhe}>
								{(index + 1) % 16 === 1 && (
									<span className="row-name">
										{String.fromCharCode(65 + parseInt(index / 16))}
									</span>
								)}

								<Button
									disableRipple
									variant="contained"
									onClick={() => handleSelectTicket(ticket)}
									className={classNames({
										'booking-btn': true,
										'regular-ticket': ticket.loaiGhe === 'Thuong',
										'vip-ticket': ticket.loaiGhe === 'Vip',
										'booking-ticket': isBookingTicket(ticket),
										'booked-ticket': ticket.daDat,
									})}
								>
									{ticket.daDat && <CloseIcon color="inherit" />}
									{isBookingTicket(ticket) && convertNumberToSeatNumber(ticket)}
								</Button>

								{(index + 1) % 16 === 0 && <div className="line-break"></div>}
							</Fragment>
						)
					})}
				</Box>

				<Box className={classes.noteBox}>
					<Box className="note-item">
						<span className="ticket-label regular-ticket" />
						<Typography className="ticket-text" component="span">
							Thường
						</Typography>
					</Box>

					<Box className="note-item">
						<span className="ticket-label vip-ticket" />
						<Typography className="ticket-text" component="span">
							Vip
						</Typography>
					</Box>

					<Box className="note-item">
						<span className="ticket-label booking-ticket" />
						<Typography className="ticket-text" component="span">
							Đang đặt
						</Typography>
					</Box>

					<Box className="note-item">
						<span className="ticket-label booked-ticket" />
						<Typography className="ticket-text" component="span">
							Đã đặt
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default BookingScreen
