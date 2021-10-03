import axiosClient from './axiosClient'
import { groupId } from 'settings/config.js'

const cinemaAPI = {
	getCinemaSystemList: cinemaSystemId => {
		return axiosClient.get('/quanlyrap/laythongtinhethongrap', {
			params: {
				maHeThongRap: cinemaSystemId,
			},
		})
	},
	getCinemaList: cinemaSystemId => {
		return axiosClient.get('/quanlyrap/laythongtincumraptheohethong', {
			params: {
				maNhom: groupId,
				maHeThongRap: cinemaSystemId,
			},
		})
	},
	getShowtimesOfCinemaSystem: cinemaSystemId => {
		return axiosClient.get('/quanlyrap/laythongtinlichchieuhethongrap', {
			params: {
				maNhom: groupId,
				maHeThongRap: cinemaSystemId,
			},
		})
	},
}

export default cinemaAPI
