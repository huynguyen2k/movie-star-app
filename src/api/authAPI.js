import axiosClient from './axiosClient'

const authAPI = {
	register: data => {
		return axiosClient.post('/quanlynguoidung/dangky', data)
	},
	login: data => {
		return axiosClient.post('/quanlynguoidung/dangnhap', data)
	},
}

export default authAPI
