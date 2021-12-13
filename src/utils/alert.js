import Swal from 'sweetalert2'

const alert = {
	errorAlert: message => {
		Swal.fire({
			icon: 'error',
			title: 'Cảnh báo!',
			text: message,
			confirmButtonText: 'Xác nhận',
			confirmButtonColor: '#27ae60',
		})
	},
	successAlert: message => {
		Swal.fire({
			icon: 'success',
			title: 'Thành công!',
			text: message,
			confirmButtonText: 'Xác nhận',
			confirmButtonColor: '#27ae60',
		})
	},
	confirmAlert: message => {
		return Swal.fire({
			icon: 'warning',
			title: 'Cảnh báo!',
			text: message,
			showCancelButton: true,
			confirmButtonColor: '#27ae60',
			cancelButtonColor: 'var(--danger)',
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Hủy bỏ',
			allowEscapeKey: false,
			allowOutsideClick: false,
		})
	},
}

export default alert
