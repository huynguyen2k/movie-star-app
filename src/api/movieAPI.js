import axiosClient from './axiosClient'
import { groupId } from 'settings/config.js'

const movieAPI = {
	getMovieList: data => {
		return axiosClient.get('/quanlyphim/laydanhsachphim', {
			params: {
				maNhom: groupId,
				tenPhim: data && data.movieName ? data.movieName : undefined,
			},
		})
	},
	getMovieInfo: maPhim => {
		return axiosClient.get('/quanlyphim/laythongtinphim', {
			params: {
				maPhim,
			},
		})
	},
}

export default movieAPI
