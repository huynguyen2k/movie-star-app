import { Box, Grid } from '@material-ui/core'
import ticketAPI from 'api/ticketAPI'
import BookingDetail from 'components/BookingDetail'
import BookingScreen from 'components/BookingScreen'
import Loading from 'components/Loading'
import useLoading from 'hooks/useLoading'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import history from 'utils/history'
import sleep from 'utils/sleep'

function BookingTicket() {
	const { showtimesId } = useParams()

	const [loading, setLoading] = useLoading()
	const [movieDetail, setMovieDetail] = useState(null)
	const [ticketList, setTicketList] = useState([])
	const [bookingList, setBookingList] = useState([])

	useEffect(() => {
		;(async () => {
			const response = await ticketAPI.getTicketList(showtimesId)

			setMovieDetail(response.content.thongTinPhim)
			setTicketList(response.content.danhSachGhe)
		})()
	}, [showtimesId])

	const handleSelectTicket = ticket => {
		const { maGhe } = ticket
		const newBookingList = [...bookingList]
		const index = newBookingList.findIndex(ticket => ticket.maGhe === maGhe)

		const maxTicket = 6
		if (bookingList.length >= maxTicket && index === -1) {
			Swal.fire({
				icon: 'warning',
				title: 'Thông báo?',
				text: `Xin lỗi bạn chỉ có thể đặt tối đa ${maxTicket} vé!`,
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
			return
		}

		if (index >= 0) {
			newBookingList.splice(index, 1)
			setBookingList(newBookingList)
			return
		}

		newBookingList.push(ticket)
		setBookingList(newBookingList)
	}

	const handleBookingTicket = async () => {
		const result = await Swal.fire({
			icon: 'warning',
			title: 'Thông báo!',
			text: 'Bạn có chắc là muốn đặt vé không?',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showCancelButton: true,
			confirmButtonText: 'Có',
			cancelButtonText: 'Không',
			confirmButtonColor: 'var(--success)',
			cancelButtonColor: 'var(--danger)',
		})

		if (result.isDismissed) {
			return
		}

		const data = {
			maLichChieu: showtimesId,
			danhSachVe: bookingList,
		}

		try {
			setLoading(true)
			await ticketAPI.bookingTicket(data)
			await sleep(1000)
			setLoading(false)

			const result = await Swal.fire({
				icon: 'success',
				title: 'Thành công!',
				text: 'Bạn đã đặt vé thành công!',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			if (result.isConfirmed) {
				history.push('/')
			}
		} catch (error) {
			setLoading(false)
			console.log(error.message)
		}
	}

	const handleTimeout = useCallback(async () => {
		setBookingList([])

		const result = await Swal.fire({
			icon: 'warning',
			title: 'Thông báo!',
			text: 'Đã hết thời gian giữ ghế bạn có muốn đặt lại ghế hay không?',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showCancelButton: true,
			confirmButtonText: 'Có',
			cancelButtonText: 'Không',
			confirmButtonColor: 'var(--success)',
			cancelButtonColor: 'var(--danger)',
		})

		if (result.isConfirmed) {
			history.go(0)
		} else {
			history.push('/')
		}
	}, [])

	return (
		<Box>
			{loading && <Loading />}

			<Grid container>
				<Grid item xs={9}>
					<BookingScreen
						holdingTimes={300}
						onTimeout={handleTimeout}
						movieDetail={movieDetail}
						ticketList={ticketList}
						bookingList={bookingList}
						onSelectTicket={handleSelectTicket}
					/>
				</Grid>

				<Grid item xs={3}>
					<BookingDetail
						movieDetail={movieDetail}
						bookingList={bookingList}
						onBookingTicket={handleBookingTicket}
					/>
				</Grid>
			</Grid>
		</Box>
	)
}

export default BookingTicket
