import axiosClient from './axiosClient'

const ticketAPI = {
	getTicketList: showtimesId => {
		return axiosClient.get('/QuanLyDatVe/LayDanhSachPhongVe', {
			params: {
				MaLichChieu: showtimesId,
			},
		})
	},
	bookingTicket: data => {
		return axiosClient.post('/QuanLyDatVe/DatVe', data)
	},
}

export default ticketAPI
